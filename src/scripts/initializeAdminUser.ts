import { authService } from '@/firebase/auth.service'

export async function initializeAdminUser() {
  try {
    console.log('Checking for admin user...')
    
    // Try to sign in with admin credentials
    try {
      await authService.signIn('admin@google.com', '123456')
      console.log('Admin user already exists')
      await authService.signOut()
      return
    } catch (error) {
      // User doesn't exist, create it
      console.log('Creating admin user...')
    }

    // Create admin user
    await authService.createUser('admin@google.com', '123456', 'admin')
    console.log('Admin user created successfully')
    await authService.signOut()
  } catch (error) {
    console.error('Error initializing admin user:', error)
  }
}
