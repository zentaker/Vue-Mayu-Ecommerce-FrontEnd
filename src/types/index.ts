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
}

export interface Outfit {
  id: string
  image1: string
  image2: string
  products: string[]
  title: string
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

export interface Filters {
  category: string
  color: string
  size: string
  priceRange: [number, number]
  availableOnly: boolean
}
