<template>
  <form action="javascript:void(0);" @submit="submitContact">
    <div class="alert alert-danger shadow" role="alert" v-if="errorMessage">
      <strong> Error! </strong> {{errorMessage}}
    </div>

    <div class="row">
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="name-input" class="form-label">
            Name
          </label>
          <input
              type="text"
              class="form-control"
              placeholder="Contact Name"
              id="name-input"
              v-model="contact.contact_name"
          />
        </div>
      </div>
      <!--end col-->
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="company-input" class="form-label">
            Contact Company
          </label>
          <input
              type="text"
              class="form-control"
              placeholder="Contact Company"
              id="company-input"
              v-model="contact.contact_company"
          />
        </div>
      </div>
      <!--end col-->
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="email-input" class="form-label">
            Contact Email
          </label>
          <input
              type="text"
              class="form-control"
              placeholder="Contact Email"
              id="email-input"
              v-model="contact.contact_email"
          />
        </div>
      </div>
      <!--end col-->
      <div class="col-6">
        <div class="mb-3">
          <label htmlFor="phone-input" class="form-label">
            Contact Phone
          </label>
          <input
              type="text"
              class="form-control"
              placeholder="Contact Phone"
              id="phone-input"
              v-model="contact.contact_number"
          />
        </div>
      </div>

      <div class="text-success mt-2 mb-2" v-if="isSuccess">Contact Saved!</div>
      <!--end col-->
      <div class="col-lg-12">
        <div class="text-end">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </form>
</template>

<script>
import {addNewContact, updateContact} from "@/helpers";
import {useNumbersStore, useUsersStore} from "@/stores";

export default {
  name: "ContactForm",
  props: {
    contactToUpdate: Object
  },
  data() {
    return {
      isLoading: false,
      errorMessage: "",
      contact: {
        contact_email: "",
        contact_name: "",
        contact_number: "",
        contact_company: "",
        business_number: "",
        user: this.userStore.currentUser.id
      },
      isSuccess: false
    }
  },
  computed: {
    isUpdate() {
      return !!this.contactToUpdate
    }
  },
  methods: {
    resetContact() {
      this.contact = {
        contact_email: "",
        contact_name: "",
        contact_number: "",
        contact_company: "",
        business_number: ""
      }
    },
    async submitContact() {
      this.isLoading = true;
      this.errorMessage = ""
      if (
          !this.contact.contact_number
          || !this.contact.contact_name
          || !this.contact.contact_company
          || !this.contact.contact_email
      ) {
        this.errorMessage = "Please fill all fields"
        this.isLoading = false
        return;
      }
      try {
        if(this.isUpdate) {
          await updateContact(this.contactToUpdate.id, this.contact)
        }
        else {
          this.contact.business_number = this.numbersStore.activeNumber?.business_number?.id
          await addNewContact(this.contact);
        }
        this.resetContact();
        this.isLoading = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false
        }, 2000);
        this.$emit("success")
      }
      catch(e) {
        this.errorMessage = e
      }
    }
  },
  watch: {
    contactToUpdate(newValue) {
      if (newValue) {
        this.contact = {
          ...newValue
        }
      }
    }
  },
  setup () {
    const userStore = useUsersStore()
    const numbersStore = useNumbersStore()
    return {
      userStore,
      numbersStore
    }
  }
}
</script>

<style scoped>

</style>