<template>
  <div class="home-view">
    <MasonryFeed :outfits="catalogStore.outfits" />
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '@/stores/catalogStore'
import MasonryFeed from '@/components/MasonryFeed.vue'

const catalogStore = useCatalogStore()
</script>

<style scoped lang="scss">
.home-view {
  min-height: 100vh;
  background: #fafafa;
}
</style>
