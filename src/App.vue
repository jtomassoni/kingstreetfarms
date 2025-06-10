<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Navigation -->
    <nav class="bg-[var(--ksf-green)] shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center space-x-3">
            <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8 w-12"><path d="M0 24L12 8L24 24L36 12L48 24" stroke="#fff8f1" stroke-width="3" fill="none"/><circle cx="36" cy="12" r="2" fill="#a47551"/></svg>
            <h1 class="text-xl sm:text-2xl font-bold text-[var(--ksf-cream)] tracking-wide drop-shadow">King Street Farms - Outdoor Goods</h1>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      <!-- Intro Paragraph -->
      <div class="mb-2 text-center">
        <h2 class="text-xl font-bold text-[var(--ksf-green)] mb-1 font-serif">Welcome to King Street Farms!</h2>
        <p class="text-[var(--ksf-dark)] max-w-5xl mx-auto text-sm">
          Handcrafted outdoor goods, built to last in our Denver backyard. Firewood racks, wine racks, and more - all made to order with local materials and care. Fast turnaround and delivery available.
        </p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="product in products" :key="product.id" class="farmhouse-card overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full min-h-[480px] group focus:outline-none focus:ring-2 focus:ring-[var(--ksf-brown)]">
          <!-- Product Image -->
          <div 
            class="relative aspect-w-1 aspect-h-1 cursor-pointer" 
            @click="openImageModal(product)"
          >
            <img 
              :src="product.images[0].src" 
              :alt="product.images[0].alt" 
              class="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
            >
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
              </svg>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex flex-col flex-1 p-3">
            <div class="mb-1">
              <h3 class="text-base font-semibold text-[var(--ksf-green)] font-serif">{{ product.name }}</h3>
              <p class="text-xs text-[var(--ksf-brown)] mt-0.5 font-mono">{{ product.dimensions }}</p>
            </div>
            <p class="text-xs text-[var(--ksf-dark)] mb-2">{{ product.description }}</p>
            
            <!-- Features List -->
            <ul class="text-xs text-[var(--ksf-dark)] mb-2 space-y-1">
              <li v-for="feature in product.features" :key="feature" class="flex items-start">
                <svg class="h-3 w-3 text-[var(--ksf-green)] mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
              </li>
            </ul>

            <div class="mt-auto pt-2 border-t border-gray-100">
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-baseline">
                  <div>
                    <p class="text-base font-semibold text-[var(--ksf-green)]">${{ product.price }} total</p>
                  </div>
                </div>
                <button 
                  @click="redirectToCheckout(product)"
                  class="w-full farmhouse-btn py-1.5 px-3 text-sm text-center text-white font-semibold hover:bg-[var(--ksf-brown)] transition-colors duration-200"
                >
                  Pay ${{ product.depositPrice }} Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery Notice -->
      <div class="mt-3 text-center">
        <p class="text-sm text-[var(--ksf-dark)] bg-[var(--ksf-cream)] border border-[var(--ksf-brown)] border-opacity-20 px-4 py-2 rounded-lg inline-block max-w-xl">
          Delivery available in the Denver area for an additional fee. Each item requires a separate checkout while we build a better shopping experience. Thanks for understanding!
        </p>
      </div>
    </main>

    <!-- Image Modal -->
    <div 
      v-if="showModal && currentProduct" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="closeModal"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-75"></div>
      
      <!-- Modal Content: only image and arrows, tightly wrapped -->
      <div 
        class="relative z-10 max-w-4xl w-full mx-4 flex flex-col items-center"
        style="pointer-events: none;"
      >
        <!-- Close Button -->
        <button 
          @click.stop="closeModal"
          class="absolute -top-12 right-0 text-white hover:text-[var(--ksf-brown)] transition-colors"
          style="pointer-events: auto;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Image and arrows: pointer-events enabled -->
        <div class="relative" style="pointer-events: auto;">
          <img 
            :src="currentProduct.images[currentImageIndex].src"
            :alt="currentProduct.images[currentImageIndex].alt"
            class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
          >
          <!-- Navigation Arrows (only show if multiple images) -->
          <template v-if="currentProduct.images.length > 1">
            <button 
              @click.stop="prevImage"
              class="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click.stop="nextImage"
              class="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </template>
          <!-- Image Counter (only show if multiple images) -->
          <div 
            v-if="currentProduct.images.length > 1"
            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
          >
            {{ currentImageIndex + 1 }} / {{ currentProduct.images.length }}
          </div>
        </div>
        <!-- Subtle close message, pointer-events none so backdrop receives click -->
        <p class="text-xs text-center text-white/80 mt-2 select-none" style="pointer-events: none;">Click anywhere outside the photo to close.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ProductImage {
  src: string
  alt: string
}

interface Product {
  id: number
  name: string
  price: number
  depositPrice: number
  deliveryPrice: number
  images: ProductImage[]
  description: string
  features: string[]
  dimensions: string
  delivery: string
  depositUrl: string
}

const showModal = ref(false)
const currentProduct = ref<Product | null>(null)
const currentImageIndex = ref(0)

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Wine Rack',
    price: 50.00,
    depositPrice: 25.00,
    deliveryPrice: 15.00,
    images: [
      { src: '/wine-rack.jpg', alt: 'Handcrafted wine rack with built-in glass holder' }
    ],
    description: 'Elevate your wine collection with our handcrafted wine rack. Perfect for displaying your favorite bottles while keeping them organized and easily accessible. Made with premium materials and built to last. Features a convenient wine glass holder below for easy access to your favorite stemware.',
    features: [
      'Holds up to 12 wine bottles',
      'Built-in wine glass holder',
      'Made from premium pine',
      'Sturdy construction',
      'Easy to assemble'
    ],
    dimensions: '19" tall x 24" wide (plus 1.5" below for wine glass holders)',
    delivery: 'Delivery available for $15',
    depositUrl: 'https://buy.stripe.com/eVq8wOcbQ8zugJg6AL6g800'
  },
  {
    id: 2,
    name: 'Waterproof Patio Storage Bench',
    price: 350.00,
    depositPrice: 150.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/coming-soon.jpg', alt: 'Waterproof patio storage bench - fully sealed for maximum protection' }
    ],
    description: 'Our premium waterproof storage bench offers versatile outdoor storage with complete weather protection. Perfect for storing cushions, gardening tools, or outdoor toys while providing a cozy spot to relax. Built to withstand Colorado\'s unpredictable weather year-round.',
    features: [
      'Fully waterproof construction',
      'Dual-purpose design: bench and storage',
      'Comfortable seating height',
      'Made from premium pressure-treated lumber',
      'Weather-sealed for year-round use',
      'Easy to assemble'
    ],
    dimensions: '48" wide x 22" deep x 25.5" tall',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/28E4gy3Fk5ni2Sq8IT6g801'
  },
  {
    id: 3,
    name: 'Backyard Tool Shed',
    price: 275.00,
    depositPrice: 125.00,
    deliveryPrice: 125.00,
    images: [
      { src: '/coming-soon.jpg', alt: 'Backyard tool shed - vertical storage cabinet with barn-style doors' }
    ],
    description: 'Keep your tools dry, organized, and out of sight. This compact vertical cabinet is built tough with pressure-treated lumber, slatted for ventilation, and styled to match our firewood racks. Perfect for patios, side yards, or against a fence.',
    features: [
      'Fully enclosed with barn-style doors',
      'Slatted sides for airflow and drainage',
      'Optional lock hardware',
      'Weather-sealed for Colorado winters',
      'Optional shelving or tool hooks inside',
      'Made from premium pressure-treated lumber'
    ],
    dimensions: '36" wide x 18" deep x 48" tall (custom sizes available)',
    delivery: 'Delivery available in the Denver area for $125',
    depositUrl: 'https://buy.stripe.com/4gM5kC4Jo02Y50ygbl6g803'
  },
  {
    id: 4,
    name: 'Standard Planter Box',
    price: 85.00,
    depositPrice: 40.00,
    deliveryPrice: 15.00,
    images: [
      { src: '/coming-soon.jpg', alt: 'Standard planter box - perfect for herbs and flowers' }
    ],
    description: 'A versatile planter box perfect for herbs, flowers, or small vegetables. Made from premium cedar, this planter brings natural beauty to your garden while providing excellent drainage and durability.',
    features: [
      'Made from premium cedar',
      'Built-in drainage system',
      'Perfect for herbs and flowers',
      'Naturally rot-resistant',
      'Easy to assemble'
    ],
    dimensions: '24" wide x 12" deep x 12" tall',
    delivery: 'Delivery available for $15',
    depositUrl: 'https://buy.stripe.com/9B6fZg7VA17278Ge3d6g804'
  },
  {
    id: 5,
    name: 'Garden Bench',
    price: 225.00,
    depositPrice: 100.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/coming-soon.jpg', alt: 'Handcrafted garden bench - perfect for enjoying your outdoor space' }
    ],
    description: 'A beautiful handcrafted garden bench that brings comfort and style to your outdoor space. Made from premium pressure-treated lumber, this bench is built to last through Colorado seasons while providing a perfect spot to enjoy your garden.',
    features: [
      'Made from premium pressure-treated lumber',
      'Comfortable seating height',
      'Weather-resistant construction',
      'Perfect for gardens and patios',
      'No assembly required',
      'Built to last'
    ],
    dimensions: '48" wide x 18" deep x 18" tall (seat height)',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/28E5kC1xc7vqfFc2kv6g805'
  },
  {
    id: 6,
    name: 'Quarter Cord Firewood Rack',
    price: 250.00,
    depositPrice: 100.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/quarter-cord.jpg', alt: 'Quarter cord firewood rack with galvanized tin roof' }
    ],
    description: 'Ready for backyard fire season? Say goodbye to messy blue tarps! Our custom firewood storage rack is built from pressure-treated lumber with a galvanized tin roof. Perfect for keeping your firewood dry and organized.',
    features: [
      'Pressure-treated lumber construction',
      'Galvanized tin roof',
      'Keeps firewood dry and organized',
      'Built to last through Colorado winters',
      'No assembly required'
    ],
    dimensions: '2\' x 4\' x 5\'',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/7sYeVc5Ns9Dy9gO1gr6g806'
  },
  {
    id: 7,
    name: 'Half Cord Firewood Rack',
    price: 450.00,
    depositPrice: 200.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/half-cord-2.jpg', alt: 'Half cord firewood rack - alternate view' },
      { src: '/half-cord.jpg', alt: 'Half cord firewood rack with sturdy construction' }
    ],
    description: 'The perfect solution for serious firewood storage. Built to withstand Colorado winters with no wobbles, rust, or squeaky plastic. Just clean, solid construction that looks great in any yard.',
    features: [
      'Extra sturdy construction',
      'Pressure-treated lumber',
      'Galvanized tin roof',
      'Perfect for larger firewood needs',
      'No assembly required'
    ],
    dimensions: '2\' x 6\' x 6\'',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/7sY00iejYeXS9gO3oz6g807'
  },
  {
    id: 8,
    name: 'Full Cord Firewood Rack',
    price: 750.00,
    depositPrice: 200.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/full-cord.jpg', alt: 'Full cord firewood rack, our largest storage solution' }
    ],
    description: 'Our largest and most versatile firewood storage solution. Handcrafted with care in our backyard workshop, this rack is designed to last for years while keeping your firewood perfectly organized.',
    features: [
      'Holds a full cord of firewood',
      'Heavy-duty construction',
      'Pressure-treated lumber',
      'Galvanized tin roof',
      'No assembly required'
    ],
    dimensions: '4\' x 4\' x 8\'',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/5kQ8wOfo29Dy3Wugbl6g808'
  }
])

const openImageModal = (product: Product) => {
  currentProduct.value = product
  currentImageIndex.value = 0
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentProduct.value = null
}

const nextImage = () => {
  if (currentProduct.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % currentProduct.value.images.length
  }
}

const prevImage = () => {
  if (currentProduct.value) {
    currentImageIndex.value = (currentImageIndex.value - 1 + currentProduct.value.images.length) % currentProduct.value.images.length
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!showModal.value) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
}

// Add keyboard event listener
window.addEventListener('keydown', handleKeydown)

const redirectToCheckout = (product: Product) => {
  window.open(product.depositUrl, '_blank')
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style> 