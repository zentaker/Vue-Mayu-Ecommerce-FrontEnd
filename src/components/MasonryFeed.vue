<template>
  <div class="modern-feed">
    <article v-for="outfit in outfits" :key="outfit.id" class="feed-card">
      <router-link 
        :to="`/post/${outfit.id}`"
        class="card-link"
        :aria-label="`Ver post de ${outfit.userName}: ${outfit.title}`"
      >
        <div class="card-image-wrapper">
          <img :src="outfit.imageUrl" :alt="outfit.title" loading="lazy" class="card-image" />
        </div>
      </router-link>
      
      <div class="card-info">
        <h3 class="card-title">{{ outfit.title }}</h3>
        <div class="card-meta">
          <div class="user-section">
            <img :src="outfit.userAvatar" :alt="outfit.userName" class="user-avatar" />
            <span class="user-name">{{ outfit.userName }}</span>
          </div>
          <button 
            class="like-btn" 
            @click.stop="handleLike(outfit.id)" 
            :aria-label="`Dar like. ${formatLikes(outfit.likes)} personas ya reaccionaron`"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            <span class="like-count">{{ formatLikes(outfit.likes) }}</span>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { Outfit } from '@/types'

defineProps<{
  outfits: Outfit[]
}>()

function handleLike(id: string) {
  console.log('Liked outfit:', id)
}

function formatLikes(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'k'
  }
  return count.toString()
}
</script>

<style scoped lang="scss">
.modern-feed {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  background: #f0ebe6;
  
  @media (min-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  @media (min-width: 1800px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }
}

.feed-card {
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  
  &:focus {
    outline: 3px solid #c67b5c;
    outline-offset: -3px;
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  background: #f0ebe6;
  overflow: hidden;
  
  /* MOBILE: Ratio horizontal para ver 2-3 posts */
  aspect-ratio: 3 / 2;
  max-height: min(60vh, 320px);
  
  /* TABLET: Casi cuadrado */
  @media (min-width: 768px) {
    aspect-ratio: 4 / 3;
    max-height: min(55vh, 380px);
  }
  
  /* DESKTOP: Más vertical tipo Instagram */
  @media (min-width: 1400px) {
    aspect-ratio: 5 / 7;
    max-height: min(65vh, 420px);
  }
}

.card-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.card-info {
  padding: 0.875rem;
  background: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  
  @media (min-width: 768px) {
    padding: 1rem;
  }
}

.card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
  min-width: 0;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #f0ebe6;
  
  @media (min-width: 768px) {
    width: 32px;
    height: 32px;
  }
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4238;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #c67b5c;
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem -0.5rem -0.5rem 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    color: #b56a4d;
    transform: scale(1.05);
  }
  
  &:focus {
    outline: 2px solid #c67b5c;
    outline-offset: 2px;
    border-radius: 4px;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    flex-shrink: 0;
  }
}

.like-count {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4238;
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
  }
}
</style>
