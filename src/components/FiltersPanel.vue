<template>
  <aside class="filters-panel" :class="{ open: isOpen }">
    <div class="filters-header">
      <h2>Filtros</h2>
      <button @click="reset" class="reset-btn">Limpiar</button>
    </div>
    
    <div class="filter-group">
      <label class="filter-label">Categoría</label>
      <select v-model="localFilters.category" @change="updateFilters">
        <option value="">Todas</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ formatCategory(cat) }}
        </option>
      </select>
    </div>
    
    <div class="filter-group">
      <label class="filter-label">Color</label>
      <select v-model="localFilters.color" @change="updateFilters">
        <option value="">Todos</option>
        <option v-for="color in colors" :key="color" :value="color">
          {{ formatColor(color) }}
        </option>
      </select>
    </div>
    
    <div class="filter-group">
      <label class="filter-label">Talla</label>
      <select v-model="localFilters.size" @change="updateFilters">
        <option value="">Todas</option>
        <option v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    
    <div class="filter-group">
      <label class="filter-label">Precio (€{{ localFilters.priceRange[0] }} - €{{ localFilters.priceRange[1] }})</label>
      <div class="price-inputs">
        <input 
          type="number" 
          v-model.number="localFilters.priceRange[0]" 
          @change="updateFilters"
          min="0"
          placeholder="Min"
        />
        <span>-</span>
        <input 
          type="number" 
          v-model.number="localFilters.priceRange[1]" 
          @change="updateFilters"
          min="0"
          placeholder="Max"
        />
      </div>
    </div>
    
    <div class="filter-group">
      <label class="checkbox-label">
        <input 
          type="checkbox" 
          v-model="localFilters.availableOnly" 
          @change="updateFilters"
        />
        <span>Solo disponibles</span>
      </label>
    </div>

    <div class="filter-group">
      <label class="filter-label">Ordenar por</label>
      <select v-model="localFilters.sortBy" @change="updateFilters">
        <option value="relevance">Relevancia</option>
        <option value="trending">Tendencia</option>
        <option value="price-asc">Precio: Menor a Mayor</option>
        <option value="price-desc">Precio: Mayor a Menor</option>
        <option value="promotions">Promociones</option>
      </select>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Filters } from '@/types'

const props = defineProps<{
  filters: Filters
  categories: string[]
  colors: string[]
  sizes: string[]
  isOpen?: boolean
}>()

const emit = defineEmits<{
  (e: 'update', filters: Filters): void
  (e: 'reset'): void
}>()

const localFilters = ref<Filters>({ ...props.filters })

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

function updateFilters() {
  emit('update', { ...localFilters.value })
}

function reset() {
  emit('reset')
}

function formatCategory(cat: string): string {
  const map: Record<string, string> = {
    tops: 'Blusas',
    bottoms: 'Pantalones',
    dresses: 'Vestidos',
    outerwear: 'Abrigos'
  }
  return map[cat] || cat
}

function formatColor(color: string): string {
  const map: Record<string, string> = {
    terracota: 'Terracota',
    beige: 'Beige',
    cream: 'Crema',
    brown: 'Marrón',
    white: 'Blanco',
    blue: 'Azul',
    multicolor: 'Multicolor'
  }
  return map[color] || color
}
</script>

<style scoped lang="scss">
.filters-panel {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 12px 12px 0 0;
    max-height: 70vh;
    overflow-y: auto;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 150;
    
    &.open {
      transform: translateY(0);
    }
  }
}

.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0;
  }
}

.reset-btn {
  background: none;
  border: none;
  color: #c67b5c;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a4238;
  margin-bottom: 0.5rem;
}

select,
input[type="number"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0d8cc;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #4a4238;
  background: #faf8f5;
  
  &:focus {
    outline: none;
    border-color: #c67b5c;
  }
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    flex: 1;
  }
  
  span {
    color: #7c6a5b;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4a4238;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
