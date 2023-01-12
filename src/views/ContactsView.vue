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
                <ContactForm
                    title="New Contact"
                    @success="contactFormSubmitted"
                    :contact-to-update="contactBeingUpdated"
                />
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
  </div>
</template>

<script>
import ContactsTable from "@/components/Shared/ContactsTable.vue";
import ContactForm from "@/components/Shared/ContactForm.vue";
import NoResultsFound from "@/components/Shared/NoResultsFound.vue";
import PaginationControl from "@/components/Shared/PaginationControl.vue";
import ConfirmationModal from "@/components/Shared/ConfirmationModal.vue";
import Modal from "@/components/Shared/Modal.vue";
import {deleteContact, fetchUserContacts} from "@/helpers";
import {buildWebdialerLink} from "@/helpers/utils";

export default {
  name: "ContactsView",
  components: {
    ConfirmationModal,
    PaginationControl,
    NoResultsFound,
    ContactForm,
    ContactsTable,
    Modal
  },
  data () {
    return {
      showContactFormModal: false,
      showConfirmDeleteContact: false,
      contacts: null,
      searchQuery: "",

      contactBeingUpdated: null,
      contactToDelete: null
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
    },
    onNextPage() {
      this.loadContacts(this.contacts.page + 1)
    },
    onPreviousPage() {
      this.loadContacts(this.contacts.page - 1)
    },
    async loadContacts(page = 1) {
      this.contacts = await fetchUserContacts()
      this.contacts.page = page
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
      window.open(buildWebdialerLink(contact.contact_number, "_blank"))
    }
  },
  async mounted() {
    await this.loadContacts()
  }
}
</script>

<style scoped>

</style>