<template>
  <div class="catalog-view">
    <div class="catalog-header">
      <h1>Catálogo</h1>
      <button class="filter-toggle" @click="toggleFilters">
        Filtros
        <span class="filter-count" v-if="activeFiltersCount > 0">{{ activeFiltersCount }}</span>
      </button>
    </div>
    
    <div class="catalog-content">
      <div class="filters-sidebar">
        <FiltersPanel 
          :filters="catalogStore.filters"
          :categories="catalogStore.categories"
          :colors="catalogStore.colors"
          :sizes="catalogStore.sizes"
          @update="updateFilters"
          @reset="catalogStore.resetFilters()"
        />
      </div>
      
      <FiltersPanel 
        :filters="catalogStore.filters"
        :categories="catalogStore.categories"
        :colors="catalogStore.colors"
        :sizes="catalogStore.sizes"
        :isOpen="filtersOpen"
        @update="updateFilters"
        @reset="catalogStore.resetFilters()"
        class="filters-mobile"
      />
      
      <div class="products-grid">
        <div class="results-header">
          <p>{{ catalogStore.filteredProducts.length }} productos</p>
        </div>
        <div v-if="catalogStore.filteredProducts.length > 0" class="grid">
          <ProductCard 
            v-for="product in catalogStore.filteredProducts" 
            :key="product.id" 
            :product="product"
          />
        </div>
        <div v-else class="no-results">
          <p>No se encontraron productos con estos filtros</p>
          <button @click="catalogStore.resetFilters()" class="reset-btn">Limpiar filtros</button>
        </div>
      </div>
    </div>
    
    <div class="overlay" :class="{ active: filtersOpen }" @click="toggleFilters"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCatalogStore } from '@/stores/catalogStore'
import ProductCard from '@/components/ProductCard.vue'
import FiltersPanel from '@/components/FiltersPanel.vue'
import type { Filters } from '@/types'

const catalogStore = useCatalogStore()
const filtersOpen = ref(false)

function toggleFilters() {
  filtersOpen.value = !filtersOpen.value
}

function updateFilters(newFilters: Filters) {
  Object.keys(newFilters).forEach(key => {
    catalogStore.setFilter(key as keyof Filters, newFilters[key as keyof Filters])
  })
}

const activeFiltersCount = computed(() => {
  let count = 0
  if (catalogStore.filters.category) count++
  if (catalogStore.filters.color) count++
  if (catalogStore.filters.size) count++
  if (catalogStore.filters.availableOnly) count++
  if (catalogStore.filters.priceRange[0] > 0 || catalogStore.filters.priceRange[1] < 100) count++
  return count
})
</script>

<style scoped lang="scss">
.catalog-view {
  min-height: 100vh;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}

.catalog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0;
  }
}

.filter-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #c67b5c;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: #b56a4d;
  }
  
  @media (min-width: 768px) {
    display: none;
  }
}

.filter-count {
  background: #ffffff;
  color: #c67b5c;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
}

.catalog-content {
  display: flex;
  gap: 2rem;
}

.filters-sidebar {
  display: none;
  
  @media (min-width: 768px) {
    display: block;
    flex-shrink: 0;
    width: 260px;
    position: sticky;
    top: 80px;
    align-self: flex-start;
  }
}

.filters-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}

.products-grid {
  flex: 1;
}

.results-header {
  margin-bottom: 1rem;
  
  p {
    color: #7c6a5b;
    font-size: 0.95rem;
    margin: 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  
  p {
    color: #7c6a5b;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
}

.reset-btn {
  background: #c67b5c;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
  cursor: pointer;
  
  &:hover {
    background: #b56a4d;
  }
}

.overlay {
  display: none;
  
  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 140;
    
    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
