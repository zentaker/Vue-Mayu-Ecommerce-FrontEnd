import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore'
import { db } from './config'
import type { Product, Outfit } from '@/types'

export interface FirestoreProduct extends Omit<Product, 'id'> {
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface FirestoreOutfit extends Omit<Outfit, 'id'> {
  createdAt: Timestamp
  updatedAt: Timestamp
  userId: string
}

export class FirestoreService {
  private static instance: FirestoreService

  private constructor() {}

  static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService()
    }
    return FirestoreService.instance
  }

  // Products
  async getProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, 'products'))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product))
  }

  async getProduct(productId: string): Promise<Product | null> {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Product
    }
    return null
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<string> {
    const productData: FirestoreProduct = {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    const docRef = await addDoc(collection(db, 'products'), productData)
    return docRef.id
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    })
  }

  async deleteProduct(productId: string): Promise<void> {
    await deleteDoc(doc(db, 'products', productId))
  }

  // Outfits
  async getOutfits(limit?: number): Promise<Outfit[]> {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
    
    const q = query(collection(db, 'outfits'), ...constraints)
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Outfit))
  }

  async getOutfit(outfitId: string): Promise<Outfit | null> {
    const docRef = doc(db, 'outfits', outfitId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Outfit
    }
    return null
  }

  async createOutfit(outfit: Omit<Outfit, 'id'>, userId: string): Promise<string> {
    const outfitData: FirestoreOutfit = {
      ...outfit,
      userId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    }
    
    const docRef = await addDoc(collection(db, 'outfits'), outfitData)
    return docRef.id
  }

  async updateOutfit(outfitId: string, updates: Partial<Outfit>): Promise<void> {
    const docRef = doc(db, 'outfits', outfitId)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    })
  }

  async deleteOutfit(outfitId: string): Promise<void> {
    await deleteDoc(doc(db, 'outfits', outfitId))
  }

  // Orders (for admin panel)
  async getOrders(): Promise<any[]> {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  async createOrder(orderData: any): Promise<string> {
    const order = {
      ...orderData,
      createdAt: Timestamp.now(),
      status: 'pending'
    }
    
    const docRef = await addDoc(collection(db, 'orders'), order)
    return docRef.id
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const docRef = doc(db, 'orders', orderId)
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    })
  }
}

export const firestoreService = FirestoreService.getInstance()
