<template>
  <div 
    @click="backgroundClick" 
    :class="{modal: true, fade: true}" 
    class="show"
    :style="{display: 'block', backgroundColor: 'rgba(0,0,0,0.6)'}" 
    :id="id" 
    tabindex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-soft-info p-3">
          <h5 class="modal-title" :id="`${id}-header`">
            {{ props.title }}
          </h5>
          <button @click="closeModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" :id="`${id}-close-modal`"></button>
        </div>
        <div class="card-body p-3">
          <slot name="top-text"></slot>

          <slot name="preview"></slot>

          <div 
            class="dropzone d-flex align-items-center justify-content-center mt-3" 
            v-bind="getRootProps()"
          >
            <input 
              v-bind="getInputProps()" 
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <div class="text-center">
              <i class="display-4 text-muted ri-upload-cloud-2-fill"></i>
              <h4>Drop files here or <span class="text-decoration-underline cursor-pointer fw-semibold text-primary">click</span> to upload.</h4>
            </div>
          </div>

          <ul 
            v-if="file"
            class="d-flex flex-wrap gap-4 list-unstyled mb-0 mt-2"
          >
            <li class="mt-2" id="dropzone-preview-list">
              <div class="border border-dashed rounded">
                <div class="d-flex align-items-center p-2">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar-sm bg-light rounded d-flex align-items-center justify-content-center">
                      <i class="text-muted ri-file-excel-2-fill text-success" :style="{ fontSize: '24px' }"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div class="pt-1">
                      <h5 class="fs-14 mb-1" data-dz-name>{{ file.name }}</h5>
                      <p class="fs-13 text-muted mb-0" data-dz-size>{{ (file.size / (1024*1024)).toFixed(2) }}MB</p>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ms-5"> 
                    <button data-dz-remove class="btn btn-sm btn-danger" @click="file = null">Delete</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
            <!-- end dropzon-preview -->
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-light" 
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="sendFile">
            {{ props.btnText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDropzone } from "vue3-dropzone";

const props = defineProps({
  id: String,
  title: String,
  btnText: String
})

const emit = defineEmits(['close', 'submit'])

const file = ref()

const closeModal = () => emit('close')
const backgroundClick = (e) =>  {
  if(e.target.id === props.id) closeModal()
}
const sendFile = () => emit('submit', file.value)

const onDrop = (acceptFiles, rejectReasons) => {
  file.value = acceptFiles[0]
}

const { getRootProps, getInputProps } = useDropzone({ onDrop })

</script>

<style lang="scss" scoped>

</style>
<script> export default { name: 'ModalUploadFiles' } </script>