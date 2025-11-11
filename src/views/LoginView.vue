<template>
  <div class="login-view">
    <div class="login-card">
      <div class="login-header">
        <h1>Iniciar Sesión</h1>
        <p>Accede a tu cuenta de Apricot Outfits</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="tu@email.com"
            required
            :disabled="authStore.loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            id="password"
            v-model="password" 
            type="password" 
            placeholder="••••••••"
            required
            :disabled="authStore.loading"
          />
        </div>

        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>

        <button 
          type="submit" 
          class="submit-btn"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <div class="demo-info">
        <p class="demo-title">Cuenta de demostración:</p>
        <p class="demo-credentials">
          <strong>Admin:</strong> admin@google.com / 123456
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

async function handleLogin() {
  authStore.clearError()
  
  const success = await authStore.signIn(email.value, password.value)
  
  if (success) {
    if (authStore.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.login-view {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #faf8f5 0%, #f0ebe6 100%);
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 0.5rem;
  }

  p {
    font-size: 0.9375rem;
    color: #7c6a5b;
    margin: 0;
  }
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #4a4238;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e0d8cc;
    border-radius: 8px;
    font-size: 1rem;
    color: #4a4238;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #c67b5c;
    }

    &:disabled {
      background: #f0ebe6;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #7c6a5b;
      opacity: 0.5;
    }
  }
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  border: 1px solid #fcc;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #c67b5c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #b56a4d;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(198, 123, 92, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #e0d8cc;
    cursor: not-allowed;
    transform: none;
  }
}

.demo-info {
  padding-top: 1.5rem;
  border-top: 1px solid #e0d8cc;
  text-align: center;

  .demo-title {
    font-size: 0.8125rem;
    color: #7c6a5b;
    margin: 0 0 0.5rem;
  }

  .demo-credentials {
    font-size: 0.875rem;
    color: #4a4238;
    margin: 0;

    strong {
      font-weight: 600;
    }
  }
}
</style>
