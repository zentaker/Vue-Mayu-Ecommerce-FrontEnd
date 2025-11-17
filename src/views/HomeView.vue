<template>
  <div class="home-view">
    <MasonryFeed :outfits="catalogStore.outfits" />
    <FloatingUpload />
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'
import FloatingUpload from '@/components/FloatingUpload.vue'

const catalogStore = useCatalogStore()
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background: #fafafa;
}
</style>
