<template>
  <Transition name="fab">
    <button 
      v-if="isVisible"
      class="floating-upload-btn"
      @click="$emit('open-upload')"
      aria-label="Subir nuevo outfit"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5v14m-7-7h14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

const isVisible = computed(() => {
  return route.path === '/'
})

defineEmits<{
  'open-upload': []
}>()
</script>

<style scoped lang="scss">
.floating-upload-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c67b5c 0%, #b56a4d 100%);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(198, 123, 92, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(198, 123, 92, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    transition: transform 0.3s;
  }
  
  &:hover svg {
    transform: rotate(90deg);
  }
}

.fab-enter-active,
.fab-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-enter-from,
.fab-leave-to {
  opacity: 0;
  transform: scale(0) rotate(45deg);
}
</style>
