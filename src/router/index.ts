import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import type { UserRole } from '@/types'
import HomeView from '@/views/HomeView.vue'
import CatalogView from '@/views/CatalogView.vue'
import RewardsView from '@/views/RewardsView.vue'
import AccountView from '@/views/AccountView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import CreatePostView from '@/views/CreatePostView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    allowedRoles?: UserRole[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/post/:id',
      name: 'post-detail',
      component: PostDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create-post',
      component: CreatePostView,
      meta: { requiresAuth: true }
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: RewardsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('@/views/StaffView.vue'),
      meta: { 
        requiresAuth: true, 
        allowedRoles: ['staff', 'superadmin'] 
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { 
        requiresAuth: true, 
        allowedRoles: ['admin', 'superadmin'] 
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Wait for auth initialization to complete
  if (authStore.loading) {
    const maxWait = 5000
    const startTime = Date.now()
    
    while (authStore.loading && (Date.now() - startTime) < maxWait) {
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    if (authStore.loading) {
      console.warn('Auth initialization timeout - forcing logout state')
      authStore.clearLoading()
    }
  }
  
  // Redirect authenticated users away from login page
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Access denied: Not authenticated. Redirecting to /login')
    next('/login')
    return
  }
  
  // Check if route requires specific roles
  if (to.meta.allowedRoles && to.meta.allowedRoles.length > 0) {
    const hasAccess = authStore.hasRole(to.meta.allowedRoles)
    if (!hasAccess) {
      console.log(`Access denied: User role "${authStore.currentUser?.role}" not in allowed roles:`, to.meta.allowedRoles)
      next('/')
      return
    }
  }
  
  next()
})

export default router
