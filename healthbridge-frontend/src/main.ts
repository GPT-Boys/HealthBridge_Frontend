import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'animate.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
