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
            <MaterialIcon name="favorite" :size="22" />
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
  column-count: 2;
  column-gap: 0.25rem;
  padding: 0.25rem;
  background: #f0ebe6;
  
  @media (min-width: 768px) {
    column-gap: 0.375rem;
    padding: 0.375rem;
  }
  
  @media (min-width: 1400px) {
    column-count: 3;
    column-gap: 0.5rem;
    padding: 0.5rem;
  }
  
  @media (min-width: 1800px) {
    column-count: 4;
    column-gap: 0.75rem;
    padding: 0.75rem;
  }
}

.feed-card {
  background: white;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  margin-bottom: 0.25rem;
  transition: transform 0.2s ease;
  break-inside: avoid;
  
  @media (min-width: 768px) {
    margin-bottom: 0.375rem;
  }
  
  @media (min-width: 1400px) {
    margin-bottom: 0.5rem;
  }
  
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
  
  /* Sin aspect-ratio fijo - permite altura variable según imagen */
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
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a4238;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (min-width: 768px) {
    font-size: 0.9375rem;
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
  font-size: 0.75rem;
  font-weight: 400;
  color: #4a4238;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (min-width: 768px) {
    font-size: 0.8125rem;
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
  
  .material-icon {
    flex-shrink: 0;
  }
}

.like-count {
  font-size: 0.75rem;
  font-weight: 500;
  color: #4a4238;
  
  @media (min-width: 768px) {
    font-size: 0.8125rem;
  }
}
</style>
