<template>
  <div class="relative w-full">
    <div class="flex items-center justify-center">
      <button @click="prev" class="p-2 text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] bg-white bg-opacity-60 rounded-full shadow mr-2" aria-label="Previous">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div class="bg-white bg-opacity-90 rounded-lg shadow p-4 flex flex-col items-center max-w-xs w-full">
        <img :src="currentProduct.images[0].src" :alt="currentProduct.images[0].alt" class="w-48 h-36 object-contain rounded mb-2" />
        <h3 class="text-lg font-bold text-[var(--ksf-green)] mb-1">{{ currentProduct.name }}</h3>
        <p class="text-sm text-[var(--ksf-dark)] mb-2">${{ currentProduct.price }}</p>
        <router-link :to="`/product/${currentProduct.id}`" class="farmhouse-btn px-4 py-2 text-sm font-semibold">View</router-link>
      </div>
      <button @click="next" class="p-2 text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] bg-white bg-opacity-60 rounded-full shadow ml-2" aria-label="Next">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
    <div class="flex justify-center mt-2 space-x-1">
      <span v-for="(p, i) in products" :key="p.id" class="inline-block w-2 h-2 rounded-full" :class="i === index ? 'bg-[var(--ksf-green)]' : 'bg-gray-300'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ products: any[] }>()
const index = ref(0)
const currentProduct = computed(() => props.products[index.value])
const prev = () => { index.value = (index.value - 1 + props.products.length) % props.products.length }
const next = () => { index.value = (index.value + 1) % props.products.length }
</script>

<style scoped>
</style> 