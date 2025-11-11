import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Mount the app immediately
app.mount('#app')

// Initialize admin user in the background (only if Firebase is properly configured)
import('./scripts/initializeAdminUser').then(({ initializeAdminUser }) => {
  initializeAdminUser().catch((err) => {
    console.log('Firebase not configured or unavailable. Admin user creation skipped.')
  })
})
