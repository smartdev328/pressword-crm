<template>
  <table class="table align-middle mb-0">
    <thead class="table-light">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Company</th>
      <th scope="col">Email</th>
      <th scope="col">Last Contacted</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(contact, i) in contacts" :key="i">
      <td>
        <div class="d-flex gap-2 align-items-center">
          <div class="flex-shrink-0">
            <img
                src="@/assets/images/anonymous.png"
                alt=""
                class="avatar-xs rounded-circle"
            />
          </div>
          <div class="flex-grow-1">{{contact.contact_name}}</div>
        </div>
      </td>
      <td>
        <a :href="`tel:${contact.contact_number}`" class="fw-semibold">
          {{contact.contact_number}}
        </a>
      </td>
      <td>
        {{contact.contact_company}}
      </td>
      <td>
        {{contact.contact_email}}
      </td>
      <td>
        {{ contact.last_contacted ? parseTimestamp(contact.last_contacted) : 'Never'}}
      </td>
      <td>
        <ul class="list-inline hstack gap-2 mb-0">
          <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
              title="Call">
            <a href="#" class="text-muted d-inline-block" @click.prevent="$emit('call-contact', contact)">
              <i class="ri-phone-line fs-16"></i>
            </a>
          </li>
          <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
              title="Edit">
            <a class="edit-item-btn" href="#" data-bs-toggle="modal" @click.prevent="$emit('edit-contact', contact)"><i
                class="ri-pencil-fill align-bottom text-muted"></i></a>
          </li>
          <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top"
              title="Delete">
            <a class="edit-item-btn" href="#" data-bs-toggle="modal" @click.prevent="$emit('delete-contact', contact)"><i
                class="ri-delete-bin-2-fill align-bottom text-muted"></i></a>
          </li>
        </ul>
      </td>
    </tr>
    </tbody>
  </table>
  <!-- end table -->
</template>

<script>
import moment from "moment";

export default {
  name: "ContactsTable",
  props: {
    contacts: Array
  },
  methods: {
    parseTimestamp(timestamp) {
      return moment(timestamp).fromNow()
    },
  }
}
</script>

<style scoped>

</style>