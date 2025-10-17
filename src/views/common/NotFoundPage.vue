<template>
  <div class="not-found">
    <div class="container text-center">
      <h1 class="display-1">404</h1>
      <h2 class="mb-4">Página No Encontrada</h2>
      <p class="text-muted mb-4">La página que buscas no existe.</p>
      <RouterLink to="/" class="btn btn-primary"> Volver al Inicio </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
