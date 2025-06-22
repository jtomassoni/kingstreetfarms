import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// Handle SPA redirect from 404.html
const redirect = sessionStorage.redirect
delete sessionStorage.redirect
if (redirect && redirect != location.href) {
  router.push(new URL(redirect).pathname)
}

app.mount('#app') 