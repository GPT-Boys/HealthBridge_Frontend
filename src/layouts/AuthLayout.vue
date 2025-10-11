<template>
  <div class="auth-layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
}
</style>
