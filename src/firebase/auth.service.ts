import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import type { User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from './config'
import type { UserRole } from '@/types'

export interface UserProfile {
  uid: string
  email: string
  role: UserRole
  displayName?: string
  createdAt: Date
}

export class AuthService {
  private static instance: AuthService

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async signIn(email: string, password: string): Promise<UserProfile> {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase no esta configurado. Agrega las variables VITE_FIREBASE_* en un archivo .env para iniciar sesion.')
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return this.getUserProfile(userCredential.user.uid)
  }

  async signOut(): Promise<void> {
    if (!isFirebaseConfigured || !auth) {
      return
    }

    await signOut(auth)
  }

  async createUser(email: string, password: string, role: UserRole = 'user'): Promise<UserProfile> {
    if (!isFirebaseConfigured || !auth || !db) {
      throw new Error('Firebase no esta configurado.')
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const userProfile: UserProfile = {
      uid: userCredential.user.uid,
      email: email,
      role: role,
      createdAt: new Date()
    }
    
    try {
      await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)
    } catch (error: any) {
      console.warn('Could not save user profile to Firestore (offline):', error.code)
    }
    
    return userProfile
  }

  async getUserProfile(uid: string): Promise<UserProfile> {
    try {
      if (db) {
        const userDoc = await getDoc(doc(db, 'users', uid))
        if (userDoc.exists()) {
          return userDoc.data() as UserProfile
        }
      }
    } catch (error: any) {
      console.warn('Firestore unavailable, using fallback profile:', error.code)
    }
    
    // Fallback for users without profile or when Firestore is offline
    const user = auth.currentUser
    
    // Special case for superadmin
    if (user?.email === 'admin@google.com') {
      return {
        uid: uid,
        email: user.email,
        role: 'superadmin',
        displayName: 'Super Admin',
        createdAt: new Date()
      }
    }
    
    return {
      uid: uid,
      email: user?.email || '',
      role: 'user',
      createdAt: new Date()
    }
  }

  onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    if (!isFirebaseConfigured || !auth) {
      callback(null)
      return () => {}
    }

    return onAuthStateChanged(auth, callback)
  }

  getCurrentUser(): FirebaseUser | null {
    if (!isFirebaseConfigured || !auth) {
      return null
    }

    return auth.currentUser
  }
}

export const authService = AuthService.getInstance()
