<template>
  <div class="rewards-view">
    <div class="rewards-header">
      <h1>VIP Club</h1>
      <p>Beneficios exclusivos para ti</p>
    </div>
    
    <div class="vip-card">
      <div class="vip-level">
        <div class="level-badge" :class="userStore.currentUser?.vipLevel">
          {{ formatVipLevel(userStore.currentUser?.vipLevel || 'bronze') }}
        </div>
        <h2>{{ userStore.currentUser?.name }}</h2>
      </div>
      <div class="points-section">
        <div class="points-display">
          <span class="points-value">{{ userStore.currentUser?.points || 0 }}</span>
          <span class="points-label">puntos</span>
        </div>
        <p class="points-info">¡Estás a 550 puntos del nivel Platino!</p>
      </div>
    </div>
    
    <div class="benefits-section">
      <h2>Tus Beneficios</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🎁</div>
          <h3>10% de descuento</h3>
          <p>En toda la tienda</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🚚</div>
          <h3>Envío gratis</h3>
          <p>En compras mayores a €50</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">⭐</div>
          <h3>Acceso anticipado</h3>
          <p>A nuevas colecciones</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🎂</div>
          <h3>Regalo de cumpleaños</h3>
          <p>Especial para ti</p>
        </div>
      </div>
    </div>
    
    <div class="promotions-section">
      <h2>Promociones Activas</h2>
      <div class="promotion-card">
        <div class="promo-header">
          <span class="promo-badge">ACTIVA</span>
          <span class="promo-expiry">Válida hasta 30/11/2025</span>
        </div>
        <h3>Doble puntos en vestidos</h3>
        <p>Acumula el doble de puntos en toda nuestra colección de vestidos</p>
      </div>
      <div class="promotion-card">
        <div class="promo-header">
          <span class="promo-badge">ACTIVA</span>
          <span class="promo-expiry">Válida hasta 15/12/2025</span>
        </div>
        <h3>15% extra en tu próxima compra</h3>
        <p>Usa el código VIP15 al finalizar tu compra</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

function formatVipLevel(level: string): string {
  const map: Record<string, string> = {
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    platinum: 'Platino'
  }
  return map[level] || level
}
</script>

<style scoped lang="scss">
.rewards-view {
  min-height: 100vh;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.rewards-header {
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #4a4238;
    margin: 0 0 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #7c6a5b;
    margin: 0;
  }
}

.vip-card {
  background: linear-gradient(135deg, #c67b5c 0%, #d4a574 100%);
  color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(198, 123, 92, 0.3);
}

.vip-level {
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.5rem;
    margin: 0.5rem 0 0;
  }
}

.level-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.25);
  
  &.gold {
    background: rgba(255, 215, 0, 0.3);
  }
}

.points-section {
  .points-display {
    margin-bottom: 0.5rem;
  }
  
  .points-value {
    font-size: 3rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  
  .points-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  
  .points-info {
    font-size: 0.95rem;
    opacity: 0.85;
    margin: 0;
  }
}

.benefits-section,
.promotions-section {
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 1rem;
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.benefit-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.25rem;
  }
  
  p {
    font-size: 0.85rem;
    color: #7c6a5b;
    margin: 0;
  }
}

.promotion-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #c67b5c;
  
  .promo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .promo-badge {
    background: #d4f4dd;
    color: #2d6a3e;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .promo-expiry {
    font-size: 0.85rem;
    color: #7c6a5b;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #4a4238;
    margin: 0 0 0.5rem;
  }
  
  p {
    font-size: 0.95rem;
    color: #7c6a5b;
    margin: 0;
  }
}
</style>
