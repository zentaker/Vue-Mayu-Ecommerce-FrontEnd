<template>
  <div class="admin-view">
    <div class="admin-header">
      <h1>Panel de Administración</h1>
      <div class="header-actions">
        <span class="user-welcome">Bienvenido, Admin</span>
        <button @click="handleLogout" class="logout-btn">
          Cerrar Sesión
        </button>
      </div>
    </div>

    <div class="admin-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'products' }"
        @click="activeTab = 'products'"
      >
        Productos
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'orders' }"
        @click="activeTab = 'orders'"
      >
        Pedidos
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'outfits' }"
        @click="activeTab = 'outfits'"
      >
        Outfits
      </button>
    </div>

    <div class="admin-content">
      <!-- Products Tab -->
      <div v-if="activeTab === 'products'" class="tab-content">
        <div class="content-header">
          <h2>Gestión de Productos</h2>
          <button @click="showProductModal = true" class="create-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo Producto
          </button>
        </div>

        <div class="products-table">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in catalogStore.products" :key="product.id">
                <td>
                  <img :src="product.imageUrl" :alt="product.name" class="product-thumb" />
                </td>
                <td>{{ product.name }}</td>
                <td>${{ product.price.toFixed(2) }}</td>
                <td>{{ getCategoryName(product.category) }}</td>
                <td>
                  <span :class="['status', product.available ? 'in-stock' : 'out-stock']">
                    {{ product.available ? 'Disponible' : 'Agotado' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="edit-btn" @click="editProduct(product)">Editar</button>
                    <button class="delete-btn" @click="deleteProduct(product.id)">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="tab-content">
        <div class="content-header">
          <h2>Pedidos Activos</h2>
        </div>
        
        <div class="orders-grid">
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">#ORD-001</span>
              <span class="order-status pending">Pendiente</span>
            </div>
            <div class="order-body">
              <p class="order-customer">María García</p>
              <p class="order-date">10 Nov 2025</p>
              <p class="order-total">$121.98</p>
            </div>
            <div class="order-actions">
              <button class="btn-process">Procesar</button>
              <button class="btn-cancel">Cancelar</button>
            </div>
          </div>

          <div class="order-card">
            <div class="order-header">
              <span class="order-id">#ORD-002</span>
              <span class="order-status processing">En Proceso</span>
            </div>
            <div class="order-body">
              <p class="order-customer">Ana Martínez</p>
              <p class="order-date">09 Nov 2025</p>
              <p class="order-total">$75.99</p>
            </div>
            <div class="order-actions">
              <button class="btn-complete">Completar</button>
            </div>
          </div>

          <div class="empty-state">
            <p>Los demás pedidos se cargarán desde Firebase</p>
          </div>
        </div>
      </div>

      <!-- Outfits Tab -->
      <div v-if="activeTab === 'outfits'" class="tab-content">
        <div class="content-header">
          <h2>Gestión de Outfits</h2>
          <button @click="showOutfitModal = true" class="create-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Nuevo Outfit
          </button>
        </div>

        <div class="outfits-grid">
          <div v-for="outfit in catalogStore.outfits" :key="outfit.id" class="outfit-card">
            <img :src="outfit.imageUrl" :alt="outfit.title" class="outfit-image" />
            <div class="outfit-info">
              <h3>{{ outfit.title }}</h3>
              <p>{{ outfit.userName }}</p>
              <div class="outfit-stats">
                <span>❤️ {{ outfit.likes }}</span>
              </div>
            </div>
            <div class="outfit-actions">
              <button class="edit-btn">Editar</button>
              <button class="delete-btn">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal (Placeholder) -->
    <Transition name="modal">
      <div v-if="showProductModal" class="modal-overlay" @click="showProductModal = false">
        <div class="modal-content" @click.stop>
          <h2>Crear Nuevo Producto</h2>
          <p>Formulario de creación de productos (próximamente)</p>
          <button @click="showProductModal = false" class="close-modal-btn">Cerrar</button>
        </div>
      </div>
    </Transition>

    <!-- Outfit Modal (Placeholder) -->
    <Transition name="modal">
      <div v-if="showOutfitModal" class="modal-overlay" @click="showOutfitModal = false">
        <div class="modal-content" @click.stop>
          <h2>Crear Nuevo Outfit</h2>
          <p>Formulario de creación de outfits (próximamente)</p>
          <button @click="showOutfitModal = false" class="close-modal-btn">Cerrar</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useCatalogStore } from '@/stores/catalogStore'
import type { Product } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const catalogStore = useCatalogStore()

const activeTab = ref<'products' | 'orders' | 'outfits'>('products')
const showProductModal = ref(false)
const showOutfitModal = ref(false)

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    tops: 'Blusas y Tops',
    bottoms: 'Pantalones y Faldas',
    dresses: 'Vestidos',
    outerwear: 'Abrigos'
  }
  return names[category] || category
}

async function handleLogout() {
  await authStore.signOut()
  router.push('/')
}

function editProduct(product: Product) {
  console.log('Edit product:', product)
  // TODO: Implement edit functionality
}

function deleteProduct(productId: string) {
  console.log('Delete product:', productId)
  // TODO: Implement delete functionality
}
</script>

<style scoped lang="scss">
.admin-view {
  min-height: calc(100vh - 60px);
  background: #faf8f5;
  padding: 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e0d8cc;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-welcome {
  font-size: 0.9375rem;
  color: #7c6a5b;
}

.logout-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b56a4d;
  }
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e0d8cc;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #7c6a5b;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #4a4238;
  }

  &.active {
    color: #c67b5c;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #c67b5c;
    }
  }
}

.admin-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.create-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #b56a4d;
    transform: translateY(-2px);
  }
}

.products-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th {
      text-align: left;
      padding: 0.75rem;
      background: #f0ebe6;
      color: #4a4238;
      font-weight: 600;
      font-size: 0.875rem;
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid #e0d8cc;
      font-size: 0.9375rem;
      color: #4a4238;
    }
  }
}

.product-thumb {
  width: 60px;
  height: 75px;
  object-fit: cover;
  border-radius: 4px;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;

  &.in-stock {
    background: #d4edda;
    color: #155724;
  }

  &.out-stock {
    background: #f8d7da;
    color: #721c24;
  }
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background: #f0ebe6;
  color: #4a4238;

  &:hover {
    background: #e0d8cc;
  }
}

.delete-btn {
  background: #f8d7da;
  color: #721c24;

  &:hover {
    background: #f5c6cb;
  }
}

.orders-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.order-card {
  background: #faf8f5;
  border: 1px solid #e0d8cc;
  border-radius: 12px;
  padding: 1.5rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-id {
  font-weight: 700;
  color: #4a4238;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  &.pending {
    background: #fff3cd;
    color: #856404;
  }

  &.processing {
    background: #cce5ff;
    color: #004085;
  }
}

.order-body {
  margin-bottom: 1rem;

  p {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: #7c6a5b;
  }

  .order-total {
    font-size: 1.125rem;
    font-weight: 700;
    color: #c67b5c;
  }
}

.order-actions {
  display: flex;
  gap: 0.5rem;

  button {
    flex: 1;
    padding: 0.625rem;
    border: none;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-process {
    background: #c67b5c;
    color: white;

    &:hover {
      background: #b56a4d;
    }
  }

  .btn-cancel {
    background: #f8d7da;
    color: #721c24;

    &:hover {
      background: #f5c6cb;
    }
  }

  .btn-complete {
    background: #28a745;
    color: white;

    &:hover {
      background: #218838;
    }
  }
}

.outfits-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.outfit-card {
  background: #faf8f5;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e0d8cc;
}

.outfit-image {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
}

.outfit-info {
  padding: 1rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.25rem;
  }

  p {
    font-size: 0.875rem;
    color: #7c6a5b;
    margin: 0 0 0.5rem;
  }
}

.outfit-stats {
  font-size: 0.875rem;
  color: #4a4238;
}

.outfit-actions {
  padding: 0 1rem 1rem;
  display: flex;
  gap: 0.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #7c6a5b;
  font-size: 0.9375rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 1rem;
  }

  p {
    color: #7c6a5b;
    margin-bottom: 1.5rem;
  }
}

.close-modal-btn {
  background: #c67b5c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #b56a4d;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .admin-view {
    padding: 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .products-table {
    font-size: 0.875rem;
  }
}
</style>
