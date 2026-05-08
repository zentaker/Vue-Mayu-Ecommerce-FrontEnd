import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey.startsWith('AIza')

let app: any = null
let auth: any = null
let db: any = null
let storage: any = null

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
    
    // Configure auth persistence to keep user logged in across page reloads
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log('Firebase initialized successfully with persistence enabled')
      })
      .catch((error) => {
        console.warn('Could not set auth persistence:', error)
        console.log('Firebase initialized successfully (without persistence)')
      })
  } catch (error) {
    console.warn('Firebase initialization failed. App will work with local data only.')
  }
} else {
  console.warn('Firebase not configured. App will work with local data only.')
}

export { auth, db, storage, isFirebaseConfigured }
export default app
