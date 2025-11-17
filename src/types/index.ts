export type UserRole = 'user' | 'staff' | 'admin' | 'superadmin'

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  comment: string
  images?: string[]
  date: string
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  color: string
  size: string[]
  available: boolean
  imageUrl: string
  imageUrl2?: string
  description?: string
  rating?: number
  reviewCount?: number
  reviews?: Review[]
}

export interface Outfit {
  id: string
  imageUrl: string
  title: string
  userName: string
  userAvatar: string
  likes: number
  description?: string
}

export interface User {
  id: string
  name: string
  email: string
  vipLevel: 'bronze' | 'silver' | 'gold' | 'platinum'
  points: number
  address?: {
    street: string
    city: string
    zipCode: string
    country: string
  }
  preferences: {
    notifications: boolean
    newsletter: boolean
  }
}

export type SortOption = 'relevance' | 'trending' | 'price-asc' | 'price-desc' | 'promotions'

export interface Filters {
  category: string
  color: string
  size: string
  priceRange: [number, number]
  availableOnly: boolean
  sortBy: SortOption
}
