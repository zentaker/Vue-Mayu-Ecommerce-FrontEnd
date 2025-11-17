import { authService } from '@/firebase/auth.service'

export async function initializeAdminUser() {
  try {
    console.log('Checking for superadmin user...')
    
    // Try to sign in with superadmin credentials
    try {
      await authService.signIn('admin@google.com', '123456')
      console.log('Superadmin user already exists')
      await authService.signOut()
      return
    } catch (error) {
      // User doesn't exist, create it
      console.log('Creating superadmin user...')
    }

    // Create superadmin user with full access
    await authService.createUser('admin@google.com', '123456', 'superadmin')
    console.log('Superadmin user created successfully: admin@google.com / 123456')
    await authService.signOut()
  } catch (error) {
    console.error('Error initializing superadmin user:', error)
  }
}
