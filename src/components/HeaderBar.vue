<template>
  <header class="header-bar">
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    <div class="logo">
      <router-link to="/">Apricot Outfits</router-link>
    </div>
    <div class="header-actions">
      <button class="icon-btn" aria-label="Search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="5" stroke="currentColor" stroke-width="2"/>
          <path d="M13 13L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()

function toggleMenu() {
  emit('toggle-menu')
}
</script>

<style scoped lang="scss">
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #f0ebe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 100;
}

.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  span {
    display: block;
    width: 24px;
    height: 2px;
    background: #4a4238;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
}

.logo {
  font-size: 1.25rem;
  font-weight: 600;
  color: #c67b5c;
  
  a {
    color: inherit;
    text-decoration: none;
  }
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
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
  
  &:hover {
    color: #c67b5c;
  }
}
</style>
