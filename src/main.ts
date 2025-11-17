import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize authentication BEFORE mounting the app
// This ensures router guards have access to currentUser on initial load
const authStore = useAuthStore()

// Use Promise.race to ensure app mounts even if Firebase is misconfigured
let timeoutId: ReturnType<typeof setTimeout>
const authTimeout = new Promise<void>((resolve) => {
  timeoutId = setTimeout(() => {
    console.warn('Auth initialization timeout - Firebase may be misconfigured')
    // Clear loading state so router guards don't hang
    authStore.clearLoading()
    resolve()
  }, 3000)
})

// Race between auth initialization and timeout
Promise.race([
  authStore.initializeAuth().then(() => {
    // Clear timeout if auth completes successfully
    clearTimeout(timeoutId)
  }),
  authTimeout
]).then(() => {
  // Mount the app after auth is initialized (or timeout)
  app.mount('#app')
  
  // Initialize admin user in the background (only if Firebase is properly configured)
  import('./scripts/initializeAdminUser').then(({ initializeAdminUser }) => {
    initializeAdminUser().catch((err) => {
      console.log('Firebase not configured or unavailable. Admin user creation skipped.')
    })
  })
})
