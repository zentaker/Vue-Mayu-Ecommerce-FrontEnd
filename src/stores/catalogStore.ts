import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, Outfit, Filters } from '@/types'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref<Product[]>([
    {
      id: '1',
      name: 'Blusa Terracota',
      price: 45.99,
      category: 'tops',
      color: 'terracota',
      size: ['XS', 'S', 'M', 'L'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      description: 'Blusa elegante con corte moderno'
    },
    {
      id: '2',
      name: 'Pantalón Beige',
      price: 59.99,
      category: 'bottoms',
      color: 'beige',
      size: ['S', 'M', 'L', 'XL'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400',
      description: 'Pantalón de corte recto'
    },
    {
      id: '3',
      name: 'Vestido Crema',
      price: 75.99,
      category: 'dresses',
      color: 'cream',
      size: ['XS', 'S', 'M'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      description: 'Vestido midi fluido'
    },
    {
      id: '4',
      name: 'Cardigan Marrón',
      price: 52.99,
      category: 'outerwear',
      color: 'brown',
      size: ['S', 'M', 'L'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      description: 'Cardigan oversize'
    },
    {
      id: '5',
      name: 'Top Blanco',
      price: 35.99,
      category: 'tops',
      color: 'white',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
      description: 'Top básico versátil'
    },
    {
      id: '6',
      name: 'Falda Midi Terracota',
      price: 48.99,
      category: 'bottoms',
      color: 'terracota',
      size: ['S', 'M', 'L'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
      description: 'Falda midi de línea A'
    },
    {
      id: '7',
      name: 'Blusa Estampada',
      price: 42.99,
      category: 'tops',
      color: 'multicolor',
      size: ['XS', 'S', 'M'],
      available: false,
      imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
      description: 'Blusa con estampado floral'
    },
    {
      id: '8',
      name: 'Jeans Azul',
      price: 68.99,
      category: 'bottoms',
      color: 'blue',
      size: ['S', 'M', 'L', 'XL'],
      available: true,
      imageUrl: 'https://images.unsplash.com/photo-1542272454315-7f6fabf2b778?w=400',
      description: 'Jeans de corte recto'
    }
  ])

  const outfits = ref<Outfit[]>([
    {
      id: 'o1',
      image1: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400',
      image2: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400',
      products: ['1', '2'],
      title: 'Look Terracota Casual'
    },
    {
      id: 'o2',
      image1: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
      image2: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
      products: ['3', '5'],
      title: 'Elegancia Neutral'
    },
    {
      id: 'o3',
      image1: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
      image2: 'https://images.unsplash.com/photo-1542272454315-7f6fabf2b778?w=400',
      products: ['4', '8'],
      title: 'Cómodo y Chic'
    },
    {
      id: 'o4',
      image1: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
      image2: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400',
      products: ['7', '6'],
      title: 'Estilo Bohemio'
    }
  ])

  const filters = ref<Filters>({
    category: '',
    color: '',
    size: '',
    priceRange: [0, 100],
    availableOnly: false
  })

  const filteredProducts = computed(() => {
    return products.value.filter((product: Product) => {
      if (filters.value.category && product.category !== filters.value.category) return false
      if (filters.value.color && product.color !== filters.value.color) return false
      if (filters.value.size && !product.size.includes(filters.value.size)) return false
      if (product.price < filters.value.priceRange[0] || product.price > filters.value.priceRange[1]) return false
      if (filters.value.availableOnly && !product.available) return false
      return true
    })
  })

  const categories = computed(() => {
    const cats = new Set(products.value.map((p: Product) => p.category))
    return Array.from(cats)
  })

  const colors = computed(() => {
    const cols = new Set(products.value.map((p: Product) => p.color))
    return Array.from(cols)
  })

  const sizes = computed(() => {
    const allSizes = products.value.flatMap((p: Product) => p.size)
    return Array.from(new Set(allSizes))
  })

  function setFilter(key: keyof Filters, value: any) {
    (filters.value as any)[key] = value
  }

  function resetFilters() {
    filters.value = {
      category: '',
      color: '',
      size: '',
      priceRange: [0, 100],
      availableOnly: false
    }
  }

  return {
    products,
    outfits,
    filters,
    filteredProducts,
    categories,
    colors,
    sizes,
    setFilter,
    resetFilters
  }
})
