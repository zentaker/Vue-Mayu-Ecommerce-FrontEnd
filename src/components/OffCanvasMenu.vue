<template>
  <div>
    <div class="overlay" :class="{ active: isOpen }" @click="close"></div>
    <aside class="off-canvas-menu" :class="{ open: isOpen }">
      <div class="menu-header">
        <h2>MAYU</h2>
        <button class="close-btn" @click="close" aria-label="Cerrar menu">
          <MaterialIcon name="close" :size="24" />
        </button>
      </div>

      <nav class="menu-nav">
        <router-link to="/" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <MaterialIcon class="nav-icon" name="home" :size="24" />
          </div>
          <span>Inicio</span>
        </router-link>

        <router-link to="/catalog" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <MaterialIcon class="nav-icon" name="storefront" :size="24" />
          </div>
          <span>Catalogo</span>
        </router-link>

        <router-link to="/rewards" @click="close" class="nav-item">
          <div class="icon-wrapper">
            <MaterialIcon class="nav-icon" name="card_giftcard" :size="24" />
          </div>
          <span>Rewards</span>
        </router-link>

        <router-link v-if="isStaff" to="/staff" @click="close" class="nav-item special">
          <div class="icon-wrapper">
            <MaterialIcon class="nav-icon" name="groups" :size="24" />
          </div>
          <span>Staff</span>
        </router-link>

        <router-link v-if="isAdmin" to="/admin" @click="close" class="nav-item special">
          <div class="icon-wrapper">
            <MaterialIcon class="nav-icon" name="admin_panel_settings" :size="24" />
          </div>
          <span>Admin</span>
        </router-link>
      </nav>

      <div class="user-card" @click="goToProfile">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Usuario"
          class="user-avatar"
        />
        <div class="user-info">
          <div class="user-name">Maria Garcia</div>
          <div class="user-role">VIP Gold</div>
        </div>
        <button class="settings-btn" @click.stop="goToSettings" aria-label="Configuracion">
          <MaterialIcon name="settings" :size="22" />
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const authStore = useAuthStore()
const { isStaff, isAdmin } = storeToRefs(authStore)

function close() {
  emit('close')
}

function goToProfile() {
  close()
  router.push('/account')
}

function goToSettings() {
  close()
  router.push('/settings')
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
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 201;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
  border-radius: 0 16px 16px 0;

  &.open {
    transform: translateX(0);
  }
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid #f0ebe6;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
    letter-spacing: 0.5px;
  }
}

.close-btn,
.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #7c6a5b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #faf8f5;
    color: #c67b5c;
  }

  &:active {
    transform: scale(0.95);
  }
}

.close-btn {
  min-width: 44px;
  min-height: 44px;
}

.menu-nav {
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  color: #7c6a5b;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 12px;
  margin-bottom: 0.375rem;

  &:hover {
    background: #faf8f5;
    color: #4a4238;

    .icon-wrapper {
      background: #fff5f0;

      .nav-icon {
        color: #c67b5c;
      }
    }
  }

  &.router-link-active {
    background: #fff5f0;
    color: #c67b5c;
    font-weight: 600;

    .icon-wrapper {
      background: #c67b5c;

      .nav-icon {
        color: #ffffff;
      }
    }
  }

  &.special {
    margin-top: 0.75rem;
    border-top: 1px solid #e0d8cc;
    padding-top: 1.25rem;

    .icon-wrapper {
      background: linear-gradient(135deg, #c67b5c 0%, #b56a4d 100%);

      .nav-icon {
        color: #ffffff;
      }
    }

    &:hover,
    &.router-link-active {
      background: linear-gradient(135deg, #fff5f0 0%, #ffe8df 100%);

      .icon-wrapper {
        background: linear-gradient(135deg, #b56a4d 0%, #a55839 100%);
      }
    }
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f0ebe6;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-icon {
  color: #7c6a5b;
  transition: color 0.2s ease;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  margin: 1rem;
  background: #faf8f5;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #f0ebe6;

  &:hover {
    background: #f0ebe6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #4a4238;
  margin-bottom: 0.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #c67b5c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
