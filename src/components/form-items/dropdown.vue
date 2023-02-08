<template>
<div class="btn-group">
  <button 
    type="button" 
    class="btn btn-soft-green waves-effect waves-light dropdown-toggle" 
    data-bs-toggle="dropdown" 
    aria-haspopup="true" 
    aria-expanded="false"
  >
    {{ props.btnText }}
  </button>
  <div class="dropdown-menu py-1">
    <template
      v-for="(item, index) in props.options"
      :key="item.value"
    >
      <span 
        class="dropdown-item text-black cursor-pointer"
        @click="selectOption(item)"
      >
        {{ item.text }}
      </span>
      <div v-if="index < (props.options.length - 1)" class="dropdown-divider my-1"></div>
    </template>
  </div>
</div><!-- /btn-group -->
</template>

<script setup>

const props = defineProps({
  btnText: String,
  options: Array
})

const emit = defineEmits(['select'])

const selectOption = (item) => emit('select', item)
</script>

<style lang="scss" scoped>

</style>