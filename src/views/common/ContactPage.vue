<template>
  <div class="contact-page py-5">
    <div class="container">
      <h2 class="text-center fw-bold mb-4">Contáctanos</h2>
      <form class="w-75 mx-auto">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" placeholder="Tu nombre completo">
        </div>
        <div class="mb-3">
          <label class="form-label">Correo electrónico</label>
          <input type="email" class="form-control" placeholder="example@correo.com">
        </div>
        <div class="mb-3">
          <label class="form-label">Mensaje</label>
          <textarea class="form-control" rows="4" placeholder="Escribe tu mensaje"></textarea>
        </div>
        <button type="submit" class="btn btn-primary w-100">Enviar mensaje</button>
      </form>
    </div>
  </div>
</template>
