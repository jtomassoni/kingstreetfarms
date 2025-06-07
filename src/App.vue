<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Navigation -->
    <nav class="bg-[var(--ksf-green)] shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center space-x-3">
            <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-12"><path d="M0 24L12 8L24 24L36 12L48 24" stroke="#fff8f1" stroke-width="3" fill="none"/><circle cx="36" cy="12" r="2" fill="#a47551"/></svg>
            <h1 class="text-xl sm:text-2xl font-bold text-[var(--ksf-cream)] tracking-wide drop-shadow">King Street Farms</h1>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <!-- Intro Paragraph -->
      <div class="mb-4 mt-2 text-center">
        <h2 class="text-2xl font-bold text-[var(--ksf-green)] mb-1 font-serif">Welcome to King Street Farms!</h2>
        <p class="text-[var(--ksf-dark)] max-w-5xl mx-auto text-sm sm:text-base lg:text-lg lg:max-w-6xl">
          Handcrafted firewood racks and wine racks, built to last and designed for Colorado living. Every piece is made to order in the backyard of our first home, with your satisfaction and our local community in mind. Fast turnaround, friendly service, and delivery available in the Denver area. Thank you for supporting local craftsmanship!
        </p>
      </div>
      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.id" @click="redirectToCheckout(product)" class="farmhouse-card overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full min-h-[560px] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--ksf-brown)]">
          <!-- Product Image -->
          <div class="relative aspect-w-1 aspect-h-1">
            <img 
              :src="product.imageSrc" 
              :alt="product.name" 
              class="w-full h-48 sm:h-56 object-cover group-hover:opacity-90 transition-opacity"
            >
          </div>

          <!-- Product Info -->
          <div class="flex flex-col flex-1 p-4">
            <div class="mb-2">
              <h3 class="text-lg font-semibold text-[var(--ksf-green)] font-serif">{{ product.name }}</h3>
              <p class="text-sm text-[var(--ksf-brown)] mt-1 font-mono">{{ product.dimensions }}</p>
            </div>
            <p class="text-sm text-[var(--ksf-dark)] mb-4">{{ product.description }}</p>
            <div class="mt-auto pt-4 border-t border-gray-100">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-lg font-semibold text-[var(--ksf-green)]">${{ product.price }}</p>
                  <p class="text-xs text-[var(--ksf-brown)]">{{ product.delivery }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Wine Rack',
    price: 50.00,
    deliveryPrice: 15.00,
    imageSrc: '/wine-rack.jpg',
    description: 'Elevate your wine collection with our handcrafted wine rack. Perfect for displaying your favorite bottles while keeping them organized and easily accessible. Made with premium materials and built to last.',
    dimensions: 'Standard size fits most wine bottles',
    delivery: 'Delivery available for $15'
  },
  {
    id: 2,
    name: 'Quarter Cord Firewood Rack',
    price: 200.00,
    deliveryPrice: 150.00,
    imageSrc: '/quarter-cord.jpg',
    description: 'Ready for backyard fire season? Say goodbye to messy blue tarps! Our custom firewood storage rack is built from pressure-treated lumber with a galvanized tin roof. Perfect for keeping your firewood dry and organized.',
    dimensions: '2\' x 4\' x 5\'',
    delivery: 'Delivery available within Denver area for $150'
  },
  {
    id: 3,
    name: 'Half Cord Firewood Rack',
    price: 350.00,
    deliveryPrice: 150.00,
    imageSrc: '/half-cord.jpg',
    description: 'The perfect solution for serious firewood storage. Built to withstand Colorado winters with no wobbles, rust, or squeaky plastic. Just clean, solid construction that looks great in any yard.',
    dimensions: '2\' x 6\' x 6\'',
    delivery: 'Delivery available within Denver area for $150'
  },
  {
    id: 4,
    name: 'Full Cord Firewood Rack',
    price: 450.00,
    deliveryPrice: 150.00,
    imageSrc: '/full-cord.jpg',
    description: 'Our largest and most versatile firewood storage solution. Handcrafted with care in our backyard workshop, this rack is designed to last for years while keeping your firewood perfectly organized.',
    dimensions: '4\' x 4\' x 8\'',
    delivery: 'Delivery available within Denver area for $150'
  }
])

const redirectToCheckout = (product: any) => {
  window.location.href = 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800'
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style> 