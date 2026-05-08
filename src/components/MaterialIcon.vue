<template>
  <span
    class="material-symbols-outlined material-icon"
    :style="iconStyle"
    aria-hidden="true"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  fill?: boolean
  weight?: number
  grade?: number
}>(), {
  size: 20,
  fill: false,
  weight: 400,
  grade: 0
})

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  fontVariationSettings: `'FILL' ${props.fill ? 1 : 0}, 'wght' ${props.weight}, 'GRAD' ${props.grade}, 'opsz' ${props.size}`
}))
</script>

<style scoped>
.material-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  line-height: 1;
  overflow: hidden;
  user-select: none;
  flex-shrink: 0;
}
</style>
