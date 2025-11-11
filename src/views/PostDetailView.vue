<template>
  <div class="post-detail-view" v-if="outfit">
    <div class="post-header">
      <button class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <h1 class="sr-only">{{ outfit.title }}</h1>
    </div>

    <div class="post-content">
      <div class="post-image-container">
        <img :src="outfit.imageUrl" :alt="outfit.title" class="post-image" />
      </div>

      <div class="post-info">
        <div class="user-header">
          <img :src="outfit.userAvatar" :alt="outfit.userName" class="user-avatar" />
          <div class="user-details">
            <h2 class="user-name">{{ outfit.userName }}</h2>
            <p class="post-time">Hace 2 horas</p>
          </div>
          <button class="follow-btn">Seguir</button>
        </div>

        <div class="post-description">
          <h3 class="post-title">{{ outfit.title }}</h3>
          <p class="post-text" v-if="outfit.description">{{ outfit.description }}</p>
        </div>

        <div class="post-actions">
          <button class="action-btn" :class="{ liked: isLiked }" @click="toggleLike">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" :fill="isLiked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>{{ formatLikes(outfit.likes + (isLiked ? 1 : 0)) }}</span>
          </button>
          <button class="action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ comments.length }}</span>
          </button>
          <button class="action-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </button>
        </div>

        <div class="comments-section">
          <h3 class="comments-title">Comentarios</h3>
          <div class="comments-list">
            <div v-for="comment in comments" :key="comment.id" class="comment">
              <img :src="comment.userAvatar" :alt="comment.userName" class="comment-avatar" />
              <div class="comment-content">
                <p class="comment-author">{{ comment.userName }}</p>
                <p class="comment-text">{{ comment.text }}</p>
                <p class="comment-time">{{ comment.time }}</p>
              </div>
            </div>
          </div>

          <div class="comment-input-container">
            <img :src="currentUserAvatar" alt="Tu avatar" class="comment-avatar" />
            <input 
              v-model="newComment" 
              type="text" 
              placeholder="Añade un comentario..." 
              class="comment-input"
              @keyup.enter="addComment"
            />
            <button class="send-btn" @click="addComment" :disabled="!newComment.trim()">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Post no encontrado</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogStore } from '@/stores/catalogStore'

const route = useRoute()
const router = useRouter()
const catalogStore = useCatalogStore()

const postId = route.params.id as string
const outfit = computed(() => catalogStore.outfits.find(o => o.id === postId))

const isLiked = ref(false)
const newComment = ref('')
const currentUserAvatar = 'https://i.pravatar.cc/150?img=1'

const comments = ref([
  {
    id: '1',
    userName: 'Ana Martínez',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    text: '¡Me encanta este look! ¿Dónde compraste la blusa?',
    time: 'Hace 1 hora'
  },
  {
    id: '2',
    userName: 'Laura González',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    text: 'Hermosa combinación de colores 😍',
    time: 'Hace 3 horas'
  },
  {
    id: '3',
    userName: 'Sofia Ramírez',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    text: 'Perfecta para el otoño',
    time: 'Hace 5 horas'
  }
])

function goBack() {
  router.back()
}

function toggleLike() {
  isLiked.value = !isLiked.value
}

function formatLikes(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'k'
  }
  return count.toString()
}

function addComment() {
  if (!newComment.value.trim()) return
  
  comments.value.unshift({
    id: Date.now().toString(),
    userName: 'María García',
    userAvatar: currentUserAvatar,
    text: newComment.value,
    time: 'Justo ahora'
  })
  
  newComment.value = ''
}
</script>

<style scoped lang="scss">
.post-detail-view {
  min-height: 100vh;
  background: #fafafa;
  padding-bottom: 4rem;
}

.post-header {
  position: sticky;
  top: 0;
  background: #ffffff;
  padding: 1rem;
  border-bottom: 1px solid #e0d8cc;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  color: #4a4238;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  
  &:hover {
    background: #f0ebe6;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.post-content {
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 400px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
  }
}

.post-image-container {
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 1024px) {
    min-height: 600px;
    position: sticky;
    top: 73px;
  }
}

.post-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
}

.post-info {
  background: #ffffff;
  
  @media (min-width: 1024px) {
    border-radius: 8px;
    margin: 1rem;
  }
}

.user-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #e0d8cc;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.25rem;
}

.post-time {
  font-size: 0.75rem;
  color: #7c6a5b;
  margin: 0;
}

.follow-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #b56a4d;
  }
}

.post-description {
  padding: 1rem;
  border-bottom: 1px solid #e0d8cc;
}

.post-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.5rem;
}

.post-text {
  font-size: 0.875rem;
  color: #4a4238;
  line-height: 1.5;
  margin: 0;
}

.post-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e0d8cc;
}

.action-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7c6a5b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s;
  font-size: 0.875rem;
  font-weight: 500;
  
  &:hover {
    background: #f0ebe6;
  }
  
  &.liked {
    color: #c67b5c;
  }
}

.comments-section {
  padding: 1rem;
}

.comments-title {
  font-size: 1rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 1rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.comment {
  display: flex;
  gap: 0.75rem;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-author {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a4238;
  margin: 0 0 0.25rem;
}

.comment-text {
  font-size: 0.875rem;
  color: #4a4238;
  line-height: 1.4;
  margin: 0 0 0.25rem;
}

.comment-time {
  font-size: 0.75rem;
  color: #7c6a5b;
  margin: 0;
}

.comment-input-container {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0d8cc;
}

.comment-input {
  flex: 1;
  border: 1px solid #e0d8cc;
  border-radius: 20px;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #c67b5c;
  }
}

.send-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.625rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #b56a4d;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #7c6a5b;
  font-size: 1.125rem;
}
</style>
