<template>
  <div class="loading-spinner" :class="{ fullscreen }">
    <div class="spinner-border" :class="`text-${color}`" role="status">
      <span class="visually-hidden">{{ message }}</span>
    </div>
    <p v-if="message && !hideMessage" class="mt-3">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  message?: string
  hideMessage?: boolean
  fullscreen?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  message: 'Cargando...',
  hideMessage: false,
  fullscreen: false,
})
</script>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 9999;
  }

  .spinner-border {
    width: 3rem;
    height: 3rem;
  }

  p {
    color: #6c757d;
    margin-top: 1rem;
  }
}
</style>
