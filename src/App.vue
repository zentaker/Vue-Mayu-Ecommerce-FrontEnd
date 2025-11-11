<template>
  <div id="app">
    <HeaderBar @toggle-menu="menuOpen = !menuOpen" />
    <OffCanvasMenu :isOpen="menuOpen" @close="menuOpen = false" />
    <main class="main-content">
      <router-view />
    </main>
    <FloatingCart />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import OffCanvasMenu from '@/components/OffCanvasMenu.vue'
import FloatingCart from '@/components/FloatingCart.vue'

const menuOpen = ref(false)
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 60px;
}
</style>
