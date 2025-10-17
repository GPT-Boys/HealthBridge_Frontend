import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css'
import 'nprogress/nprogress.css'
import './styles/main.scss'

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Perfect Scrollbar
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PerfectScrollbarPlugin)

app.mount('#app')
