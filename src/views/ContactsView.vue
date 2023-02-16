<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
              class="page-title-box d-sm-flex align-items-center justify-content-between"
          >
            <h5 class="mb-sm-0">Contacts</h5>
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <div class="d-flex align-items-center flex-wrap gap-2">
                <div class="flex-grow-1">
                </div>
                <div class="flex-shrink-0">
                  <div class="hstack text-nowrap gap-2">
                    <button class="btn btn-info add-btn" @click="showContactFormModal = true"><i class="ri-add-fill me-1 align-bottom"></i> Add Contact</button>
                    <dropdown 
                      btnText="Import Contact"
                      :options="importOptions"
                      @select="importSelect"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end col-->
        <div class="col-12">
          <div class="card" id="contactList">
            <div class="card-header">
              <div class="row g-3">
                <div class="col-md-4">
                  <form @submit="searchContacts" class="search-box">
                    <input type="text" class="form-control search" v-model="searchQuery" placeholder="Search for contact...">
                    <i class="ri-search-line search-icon"></i>
                  </form>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div>
                <div class="table-responsive table-card mb-3">
                  <template v-if="!isLoading">
                    <ContactsTable
                        :contacts="contacts.results"
                        v-if="isContactsAvailableForDisplay"
                        @edit-contact="openEditContact"
                        @delete-contact="openDeleteContact"
                        @call-contact="callContact"
                    />
                    <NoResultsFound
                        v-else
                        description="You have not created any contacts. 😄"
                    />
                  </template>
                  <Loading v-else/>
                </div>
                <PaginationControl
                    v-if="isContactsAvailableForDisplay"
                    :is-next-enabled="!!contacts?.next"
                    :is-previous-enabled="!!contacts?.previous"
                    :on-next="onNextPage"
                    :on-previous="onPreviousPage"
                />
              </div>

              <Modal v-model="showContactFormModal" id="contact-form-modal">
                <template v-slot:title>
                  {{!!contactBeingUpdated ? 'Update Contact' : 'New Contact'}}
                </template>
                <div class="card card-height-100 mb-0">
                  <div class="card-body p-4">
                    <ContactForm
                        @success="contactFormSubmitted"
                        :contact-to-update="contactBeingUpdated"
                    />
                  </div>
                </div>
              </Modal>
              <!--end add modal-->

              <ConfirmationModal
                title="Are you sure you want to delete?"
                confirm-text="Yes, please"
                v-model="showConfirmDeleteContact"
                @confirm="confirmDeletion"
              />
              <!--end delete modal -->

            </div>
          </div>
          <!--end card-->
        </div>
        <!--end col-->

        <!--end col-->
      </div>
      <!--end row-->
    </div>

    <ModalUploadFiles 
      v-if="showUploadFilesModal"
      id="importModal"
      title="Add Contacts"
      btnText="Upload file"
      @close="showUploadFilesModal = false"
      @submit="uploadFile"
    >
      <template v-slot:top-text>
        <ul class="d-flex flex-wrap gap-4 ps-3">
          <li class="text-muted">Download the .xls file below</li>
          <li class="text-muted">Add your contact details to the file.</li>
          <li class="text-muted">Save and re-upload file</li>
        </ul>
      </template>
      <template v-slot:preview>
        <ul class="d-flex flex-wrap gap-4 list-unstyled mb-0" id="dropzone-preview">
          <li class="mt-2" id="dropzone-preview-list">
            <div class="border border-dashed rounded">
              <div class="d-flex align-items-center p-2">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-sm bg-light rounded d-flex align-items-center justify-content-center">
                    <i class="text-muted ri-folder-zip-line text-success" :style="{ fontSize: '24px' }"></i>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="pt-1">
                    <h5 class="fs-14 mb-1" data-dz-name>Add_Contacts.xls</h5>
                    <p class="fs-13 text-muted mb-0" data-dz-size>2.2MB</p>
                  </div>
                </div>
                <div class="flex-shrink-0 me-2" :style="{ marginLeft: '94px' }">
                  <a href="/public/CONTACT TEMPLATE.xlsx" download>
                    <i class="text-muted ri-download-2-line text-success cursor-pointer" :style="{ fontSize: '18px' }" ></i>
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </ModalUploadFiles>

    <Modal 
      v-model="showGoogleContactsModal" id="google-contact-form-modal"
      modalClass="modal-dialog-scrollable"
    >
      <template v-slot:title>
        Add Google contacts
      </template>
      <!-- <div class="card card-height-100 mb-0"> -->
        <div class="modal-body p-4">
          <Loading v-if="loadingGoogleContacts"/>
          <div v-else>
            <template v-if="googleContacts.length">
              <label class="list-group-item mb-3 ps-3">
                <input class="form-check-input me-1" type="checkbox" @change="selectAllGoogleContacts">
                Select All
              </label>
              <div class="list-group">
                <label 
                  v-for="(item, index) in googleContacts"
                  :key="index"
                  class="list-group-item"
                >
                  <input class="form-check-input me-1" type="checkbox" :value="item" v-model="selectedGoogleContacts">
                  {{ item.contact_name }}
                </label>
              </div>
            </template>
            <span v-else>No contacts with phone number</span>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-light" 
            data-bs-dismiss="modal"
            @click="closeGoogleContactsModal"
          >
            Cancel
          </button>
          <button v-if="googleContacts.length" type="button" class="btn btn-primary" @click="saveGoogleContacts">
            Submit
          </button>
        </div>
      <!-- </div> -->
    </Modal>

    <ModalSuccess 
      v-model="importContactsFinished" 
      id="google-contact-form-modal-done"
      title="Contacts added !"
      text="You have successfully uploaded your contacts."
    />
  </div>
</template>

<script>
import * as Sentry from "@sentry/vue";

import ContactsTable from "@/components/Shared/ContactsTable.vue";
import ContactForm from "@/components/Shared/ContactForm.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import PaginationControl from "@/components/Shared/PaginationControl.vue";
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue";
import dropdown from "@/components/form-items/dropdown.vue";
import Modal from "@/components/Shared/Modal.vue";
import ModalUploadFiles from "@/components/Shared/ModalUploadFiles.vue";
import ModalSuccess from "@/components/Shared/ModalSuccess.vue";
import {deleteContact, fetchUserContacts} from "@/helpers";
import {buildWebdialerLink} from "@/helpers/utils";
import Loading from "@/components/Shared/Loading.vue";
import { useNumbersStore, useUsersStore } from "@/stores";
import {useDialerStore} from "@/stores/dialer.store";
import { addNewContacts } from "@/helpers";
import { formatResults } from "@/helpers/utils";
import * as XLSX from 'xlsx';
import { gapi } from 'gapi-script';

export default {
  name: "ContactsView",
  components: {
    ConfirmationModal,
    PaginationControl,
    NoResultsFound,
    ContactForm,
    ContactsTable,
    Modal,
    Loading,
    dropdown,
    ModalUploadFiles,
    ModalSuccess
  },
  data () {
    return {
      isLoading: false,
      showContactFormModal: false,
      showUploadFilesModal: false,
      showConfirmDeleteContact: false,
      showGoogleContactsModal: false,
      contacts: null,
      searchQuery: "",

      contactBeingUpdated: null,
      contactToDelete: null,

      importOptions: [
        // { text: 'Google Contact', value: 0 },
        { text: 'Import .xls file', value: 1 }
      ],
      googleAuth: null,
      googleContacts: [],
      selectedGoogleContacts: [],
      loadingGoogleContacts: false,
      importContactsFinished: false
    }
  },
  computed: {
    isContactsAvailableForDisplay() {
      return this.contacts?.results?.length
    }
  },
  methods: {
    async confirmDeletion() {
      await deleteContact(this.contactToDelete.id)
      this.showConfirmDeleteContact = false
      this.contactToDelete = null
      await this.loadContacts(this.contacts.page)
    },
    onNextPage() {
      this.loadContacts(this.contacts.page + 1)
    },
    onPreviousPage() {
      this.loadContacts(this.contacts.page - 1)
    },
    async loadContacts(page = 1) {
      this.isLoading = true
      try {
        this.contacts = await fetchUserContacts(page)
        this.contacts.page = page
      } catch (error) {
        console.log(error)
        Sentry.captureMessage("Error in loadContacts method of ContactsView");
        Sentry.captureException(error);
      } finally{
        this.isLoading = false
      }
    },
    async searchContacts(){

    },
    async contactFormSubmitted() {
      this.showContactFormModal = false
      this.contactBeingUpdated = null
      // Reload the current page
      await this.loadContacts(this.contacts.page)
    },
    openEditContact(contact) {
      this.contactBeingUpdated = contact
      this.showContactFormModal = true
    },
    openDeleteContact(contact) {
      this.contactToDelete = contact
      this.showConfirmDeleteContact = true
    },
    callContact(contact) {
      this.dialerStore.beginCall(contact.contact_number)
    },
    importSelect(item) {
      if(item.value == 1) this.showUploadFilesModal = true
      else this.getGoogleContacts()
    },
    getGoogleContacts() {
      // Load the API client and auth2 library
      gapi.load('client:auth2', this.initClient);
    },
    initClient() {
      const peopleApiKey = 'AIzaSyAnWR6g574x6CxuchBIErGeHr727RXRwMM'
      // const peopleApiKey = 'AIzaSyCu9D_E3igCYhX6Axww5ULXBLGnJTwVdyw'
      const peopleClientId = '643444896887-pc0ibe388b7cb29gvnaqkp5tg5p39prt.apps.googleusercontent.com'
      // const peopleClientId = '458041085291-nn2fq8oj19ibb840sfh6a4vajk8r0imn.apps.googleusercontent.com'
      // initialize the JS client library
      gapi.client
        .init({
          apiKey: peopleApiKey,
          clientId: peopleClientId,
          // scope is a space delimited string
          scope: 'https://www.googleapis.com/auth/contacts.readonly',
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/people/v1/rest']
        })
        .then(() => {
          this.googleAuth = gapi.auth2.getAuthInstance();
          // Listen for sign-in state changes.
          this.googleAuth.isSignedIn.listen(this.updateSigninStatus);
          // Handle the initial sign-in state.
          this.updateSigninStatus(this.googleAuth.isSignedIn.get());
        })
        .catch((error) => {
          console.error(error)
          Sentry.captureMessage("Error in gapi init method of ContactsView");
          Sentry.captureException(error);
        });
    },
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.makeApiCall();
      } else {
        this.googleAuth.signIn();
      }
    },
    makeApiCall() {
      this.showGoogleContactsModal = true
      this.loadingGoogleContacts = true

      // https://developers.google.com/people/api/rest/v1/people.connections/list
      gapi.client.people.people.connections
        .list({
          resourceName: 'people/me', // deprecated (required for now)
          personFields: 'emailAddresses,names,phoneNumbers,organizations',
        })
        .then(async (response) => {
          let peopleList = formatResults(response.result.connections)
          peopleList = peopleList.filter(elem => elem.phone.length)

          if(peopleList.length){
            peopleList = peopleList.map(elem => {
              return {
                contact_email: elem.email[0] ? elem.email[0] : '',
                contact_name: `${elem.first} ${elem.last}`,
                contact_number: elem.phone[0],
                contact_company: elem.organization[0] ? elem.organization[0] : '', 
                user: this.userStore.currentUser.id, 
                business_number: this.numberStore.activeNumber?.business_number?.id  
              }
            })
            this.googleContacts = JSON.parse(JSON.stringify(peopleList))
            this.loadingGoogleContacts = false
          } else this.loadingGoogleContacts = false
        })
        .catch((error) => {
          Sentry.captureMessage("Error in google contacts list method of ContactsView");
          Sentry.captureException(error);
          return error.result.error.message;
        });
    },  
    uploadFile(file){
      const fileReader = new FileReader();
      fileReader.onload = async (event) => {
        const data = event.target.result;

        let workbook = XLSX.read(data, {
          type: "binary"
        });

        let result = []

        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheet]
          );
          result = result.concat(rowObject)
        });
        
        result = result.map(elem => {
          return { 
            contact_email: elem['EMAIL'],
            contact_name: elem['NAME'],
            contact_number: elem['PHONE NUMBER'],
            contact_company: elem['COMPANY'], 
            user: this.userStore.currentUser.id, 
            business_number: this.numberStore.activeNumber?.business_number?.id  
          }
        })

        result = result.filter(elem => elem.contact_number && elem.contact_name )

        if(result.length){
          try {
            await addNewContacts({ contacts: result })
            await this.loadContacts() 
            this.importContactsFinished = true
          } catch (error) {
            console.log(error)
            Sentry.captureMessage("Error in file reader method of ContactsView");
            Sentry.captureException(error);
          } finally {
            this.showUploadFilesModal = false
          }
        } else this.showUploadFilesModal = false
      };
      fileReader.readAsBinaryString(file);
    },
    selectAllGoogleContacts(event){
      if(event.target.checked) this.selectedGoogleContacts = JSON.parse(JSON.stringify(this.googleContacts))
      else this.selectedGoogleContacts = []
    },
    async saveGoogleContacts() {
      try {
        await addNewContacts({ contacts: this.selectedGoogleContacts })
        await this.loadContacts() 
        this.importContactsFinished = true
      } catch (error) {
        console.log(error);
        Sentry.captureMessage("Error in saveGoogleContacts method of ContactsView");
        Sentry.captureException(error);
      } finally{
        this.closeGoogleContactsModal()
      }
    },
    closeGoogleContactsModal(){
      this.showGoogleContactsModal = false
      this.selectedGoogleContacts = []
    }
  },
  setup() {
    const numberStore = useNumbersStore()
    const dialerStore = useDialerStore()
    const userStore = useUsersStore()
    return {
      numberStore,
      dialerStore,
      userStore
    }
  },
  async mounted() {
    await this.loadContacts()
  }
}
</script>

<style scoped>

</style>