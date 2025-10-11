<template>
  <div v-if="message" class="alert" :class="`alert-${type}`" role="alert">
    <i class="bi" :class="icon"></i>
    <span class="ms-2">{{ message }}</span>
    <button v-if="dismissible" type="button" class="btn-close" @click="$emit('close')"></button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  message: string | null
  type?: 'danger' | 'warning' | 'info' | 'success'
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'danger',
  dismissible: true,
})

defineEmits(['close'])

const icon = computed(() => {
  const icons = {
    danger: 'bi-exclamation-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill',
    success: 'bi-check-circle-fill',
  }
  return icons[props.type]
})
</script>

<style lang="scss" scoped>
.alert {
  display: flex;
  align-items: center;

  i {
    font-size: 1.2rem;
  }

  .btn-close {
    margin-left: auto;
  }
}
</style>
