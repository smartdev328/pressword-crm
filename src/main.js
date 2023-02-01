import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import { router } from "./router";

import './assets/css/bootstrap.min.css'
import './assets/css/icons.min.css'
import './assets/css/app.min.css'
import './assets/css/custom.css'
import './assets/css/fonts.css'
import './assets/css/text-styles.css'

import './assets/js/layout.js'

import './assets/libs/bootstrap/js/bootstrap.bundle.min.js'
import './assets/libs/simplebar/simplebar.min.js'
import './assets/libs/feather-icons/feather.min.js'
import './assets/js/plugins.js'
// import './assets/js/app.js'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(Notifications)

app.mount('#app')
