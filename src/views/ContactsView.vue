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
                  <i 
                    class="text-muted ri-download-2-line text-success cursor-pointer" 
                    :style="{ fontSize: '18px' }"
                  ></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </ModalUploadFiles>
  </div>
</template>

<script>
import ContactsTable from "@/components/Shared/ContactsTable.vue";
import ContactForm from "@/components/Shared/ContactForm.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import PaginationControl from "@/components/Shared/PaginationControl.vue";
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue";
import dropdown from "@/components/form-items/dropdown.vue";
import Modal from "@/components/Shared/Modal.vue";
import ModalUploadFiles from "@/components/Shared/ModalUploadFiles.vue";
import {deleteContact, fetchUserContacts} from "@/helpers";
import {buildWebdialerLink} from "@/helpers/utils";
import Loading from "@/components/Shared/Loading.vue";
import {useNumbersStore} from "@/stores";
import {useDialerStore} from "@/stores/dialer.store";

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
    ModalUploadFiles
  },
  data () {
    return {
      isLoading: false,
      showContactFormModal: false,
      showUploadFilesModal: false,
      showConfirmDeleteContact: false,
      contacts: null,
      searchQuery: "",

      contactBeingUpdated: null,
      contactToDelete: null,

      importOptions: [
        { text: 'Google Contact', value: 0 },
        { text: 'Import .xls file', value: 1 }
      ]
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
      if(item.value == this.importOptions[1].value) this.showUploadFilesModal = true
    },
    uploadFile(file){
      console.log(file, 'file')
      this.showUploadFilesModal = false
    }
  },
  setup() {
    const numberStore = useNumbersStore()
    const dialerStore = useDialerStore()
    return {
      numberStore,
      dialerStore
    }
  },
  async mounted() {
    await this.loadContacts()
  }
}
</script>

<style scoped>

</style>