<template>
  <div class="masonry-feed">
    <div v-for="outfit in outfits" :key="outfit.id" class="feed-card">
      <div class="card-image">
        <img :src="outfit.imageUrl" :alt="outfit.title" loading="lazy" />
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ outfit.title }}</h3>
        <div class="card-footer">
          <div class="user-info">
            <img :src="outfit.userAvatar" :alt="outfit.userName" class="user-avatar" />
            <span class="user-name">{{ outfit.userName }}</span>
          </div>
          <button class="like-btn" @click.stop="handleLike(outfit.id)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/>
            </svg>
            <span class="like-count">{{ formatLikes(outfit.likes) }}</span>
          </button>
        </div>
      </div>
    </div>
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
.masonry-feed {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}

.feed-card {
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f0ebe6;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-content {
  padding: 0.75rem;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4238;
  margin: 0 0 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-name {
  font-size: 0.75rem;
  color: #7c6a5b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    color: #c67b5c;
    background: #fff5f0;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    flex-shrink: 0;
  }
}

.like-count {
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 20px;
  text-align: left;
}
</style>
