import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/app.min.css'
import './assets/css/bootstrap.min.css'
import './assets/css/icons.min.css'
import './assets/css/custom.min.css'

import './assets/js/layout.js'

import './assets/libs/bootstrap/js/bootstrap.bundle.min.js'
import './assets/libs/simplebar/simplebar.min.js'
import './assets/libs/feather-icons/feather.min'
import './assets/js/plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
