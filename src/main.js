import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Notifications from '@kyvg/vue3-notification'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

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

Sentry.init({
  app,
  dsn: "https://02725da36f4b46fca348ac6db569403b@o1125524.ingest.sentry.io/4504681683484672",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "web.pressone.africa", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.mount('#app')
