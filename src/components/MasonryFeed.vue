<template>
  <div class="masonry-feed">
    <article v-for="outfit in outfits" :key="outfit.id" class="feed-card">
      <router-link 
        :to="`/post/${outfit.id}`"
        class="card-link"
        :aria-label="`Ver post de ${outfit.userName}: ${outfit.title}`"
      >
        <div class="card-image">
          <img :src="outfit.imageUrl" :alt="outfit.title" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">
            {{ outfit.title }}
          </h3>
          <div class="card-footer">
            <div class="user-info">
              <img :src="outfit.userAvatar" :alt="outfit.userName" class="user-avatar" />
              <span class="user-name">{{ outfit.userName }}</span>
            </div>
          </div>
        </div>
      </router-link>
      <button 
        class="like-btn" 
        @click="handleLike(outfit.id)" 
        :aria-label="`Dar like. ${formatLikes(outfit.likes)} personas ya reaccionaron`"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        <span class="like-count">{{ formatLikes(outfit.likes) }}</span>
      </button>
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
.masonry-feed {
  column-count: 2;
  column-gap: 0.5rem;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    column-count: 3;
    column-gap: 0.75rem;
    padding: 0.75rem;
  }
  
  @media (min-width: 1024px) {
    column-count: 4;
    column-gap: 1rem;
    padding: 1rem;
  }
}

.feed-card {
  display: inline-block;
  width: 100%;
  margin-bottom: 0.5rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: visible;
  position: relative;
  break-inside: avoid;
  page-break-inside: avoid;
  
  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }
  
  @media (min-width: 1024px) {
    margin-bottom: 1rem;
  }
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover, &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  &:focus {
    outline: 2px solid #c67b5c;
    outline-offset: 2px;
  }
}

.card-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f0ebe6;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
}

.card-content {
  padding: 0.75rem;
  padding-bottom: 0.5rem;
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
  font-size: 0.6875rem;
  color: #7c6a5b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.like-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.375rem 0.5rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  &:hover {
    color: #c67b5c;
    background: #fff5f0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:focus {
    outline: 2px solid #c67b5c;
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    flex-shrink: 0;
  }
}

.like-count {
  font-size: 0.6875rem;
  font-weight: 600;
  min-width: 20px;
  text-align: left;
}
</style>
