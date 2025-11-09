<template>
  <div>
    <div class="overlay" :class="{ active: isOpen }" @click="close"></div>
    <aside class="off-canvas-menu" :class="{ open: isOpen }">
      <div class="menu-header">
        <h2>Menú</h2>
        <button class="close-btn" @click="close" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <nav class="menu-nav">
        <router-link to="/" @click="close" class="nav-item">
          <span class="icon">🏠</span>
          <span>Inicio</span>
        </router-link>
        <router-link to="/catalog" @click="close" class="nav-item">
          <span class="icon">👗</span>
          <span>Catálogo</span>
        </router-link>
        <router-link to="/rewards" @click="close" class="nav-item">
          <span class="icon">⭐</span>
          <span>Rewards</span>
        </router-link>
        <router-link to="/account" @click="close" class="nav-item">
          <span class="icon">👤</span>
          <span>Mi Cuenta</span>
        </router-link>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 200;
  
  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.off-canvas-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  max-width: 85vw;
  background: #ffffff;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 201;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  
  &.open {
    transform: translateX(0);
  }
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #f0ebe6;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0;
  }
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #4a4238;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: #4a4238;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.2s ease;
  min-height: 56px;
  
  .icon {
    font-size: 1.5rem;
  }
  
  &:hover {
    background: #faf8f5;
    color: #c67b5c;
  }
  
  &.router-link-active {
    background: #fff5f0;
    color: #c67b5c;
    font-weight: 500;
  }
}
</style>
