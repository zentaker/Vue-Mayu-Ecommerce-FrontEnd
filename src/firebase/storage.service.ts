import { 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import type { UploadMetadata } from 'firebase/storage'
import { storage } from './config'

export class StorageService {
  private static instance: StorageService

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  async uploadProductImage(file: File, productId: string, imageNumber: number = 1): Promise<string> {
    const fileName = `products/${productId}/image-${imageNumber}-${Date.now()}.${file.name.split('.').pop()}`
    const imageRef = storageRef(storage, fileName)
    
    const metadata: UploadMetadata = {
      contentType: file.type,
      customMetadata: {
        productId: productId,
        uploadedAt: new Date().toISOString()
      }
    }

    await uploadBytes(imageRef, file, metadata)
    return getDownloadURL(imageRef)
  }

  async uploadOutfitImage(file: File, outfitId: string): Promise<string> {
    const fileName = `outfits/${outfitId}/image-${Date.now()}.${file.name.split('.').pop()}`
    const imageRef = storageRef(storage, fileName)
    
    const metadata: UploadMetadata = {
      contentType: file.type,
      customMetadata: {
        outfitId: outfitId,
        uploadedAt: new Date().toISOString()
      }
    }

    await uploadBytes(imageRef, file, metadata)
    return getDownloadURL(imageRef)
  }

  async uploadUserAvatar(file: File, userId: string): Promise<string> {
    const fileName = `avatars/${userId}/avatar-${Date.now()}.${file.name.split('.').pop()}`
    const imageRef = storageRef(storage, fileName)
    
    const metadata: UploadMetadata = {
      contentType: file.type,
      customMetadata: {
        userId: userId,
        uploadedAt: new Date().toISOString()
      }
    }

    await uploadBytes(imageRef, file, metadata)
    return getDownloadURL(imageRef)
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = storageRef(storage, imageUrl)
      await deleteObject(imageRef)
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  }
}

export const storageService = StorageService.getInstance()
