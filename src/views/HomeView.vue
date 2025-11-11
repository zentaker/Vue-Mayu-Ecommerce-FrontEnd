<template>
  <div class="home-view">
    <MasonryFeed :outfits="catalogStore.outfits" />
    <FloatingUpload @open-upload="uploadModalOpen = true" />
    <UploadPostModal 
      :is-open="uploadModalOpen" 
      @close="uploadModalOpen = false"
      @submit="handleUploadSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'
import FloatingUpload from '@/components/FloatingUpload.vue'
import UploadPostModal from '@/components/UploadPostModal.vue'

const catalogStore = useCatalogStore()
const uploadModalOpen = ref(false)

function handleUploadSubmit(data: { image: File; title: string; description: string; tags: string[] }) {
  console.log('Post creado:', {
    title: data.title,
    description: data.description,
    tags: data.tags,
    imageSize: data.image.size,
    imageType: data.image.type
  })
  
  // TODO: Implement upload to Firebase Storage and create outfit in Firestore
  // For now, just log the data
  alert(`Post "${data.title}" creado exitosamente! (Pendiente: implementar integración con Firebase Storage)`)
}
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background: #fafafa;
}
</style>
