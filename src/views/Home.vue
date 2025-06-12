<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Hero Section -->
    <section id="hero" class="relative bg-[var(--ksf-green)] text-[var(--ksf-cream)] flex flex-col items-center justify-start overflow-visible min-h-0 h-auto min-h-[400px] max-h-[900px] pt-8 pb-2 sm:h-[85vh] sm:min-h-[600px] sm:pt-12 sm:pb-8 scroll-mt-24" style="min-height:0;">
      <!-- Background with gradient overlay -->
      <div class="absolute inset-0 w-full h-full z-0">
        <img src="/hero.png" alt="King Street Farms hero" class="w-full h-full object-cover object-center opacity-10" />
        <div class="absolute inset-0 bg-gradient-to-b from-[var(--ksf-green)]/95 to-[var(--ksf-green)]/80"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-0"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto items-center justify-start pt-8 pb-8 sm:pt-12 sm:pb-12">
        <!-- Main Heading with Animation -->
        <div class="text-center mb-8 mt-2 sm:mt-4 transform transition-all duration-700 ease-out opacity-0 translate-y-2 animate-fade-in-up">
          <h1 class="text-lg sm:text-2xl md:text-3xl font-bold mb-4 text-center drop-shadow-lg font-serif leading-tight">
            Handcrafted Home Goods, <span class="text-[var(--ksf-brown)]">Made in Denver</span>
          </h1>
          <p class="text-xs sm:text-sm max-w-xs mx-auto text-center opacity-90 leading-snug mb-0">
            Beautiful, durable furniture and storage for your home.
          </p>
        </div>
      </div>

      <!-- Featured Products Grid Overlapping Hero -->
      <div class="relative z-20 w-full flex flex-col items-center -mt-4 sm:-mt-8">
        <div class="w-full flex flex-col gap-4 px-2 sm:max-w-5xl sm:flex-row sm:overflow-visible sm:gap-6 sm:justify-center">
          <template v-for="(product, idx) in featuredProducts" :key="idx">
            <div v-if="product"
              class="product-tile relative rounded-3xl shadow-2xl transition-all duration-200 flex flex-col items-center w-full max-w-xs min-h-[220px] sm:min-h-[320px] group cursor-pointer border-4 border-[var(--ksf-green)] mx-auto sm:mx-0 overflow-hidden"
              style="min-width: 0;"
              @click="() => { console.log('Featured tile clicked'); openImageModal(product, getCardImageIndex(product.id)); }"
            >
              <!-- Full Background Image -->
              <div class="absolute inset-0 w-full h-full z-0">
                <img
                  :src="product.images[getCardImageIndex(product.id)].src"
                  :alt="product.images[getCardImageIndex(product.id)].alt"
                  class="w-full h-full object-cover object-center"
                />
                <!-- Next Arrow (only if multiple images) -->
                <template v-if="product.images.length > 1">
                  <button
                    @click.stop="() => { console.log('Featured gallery button clicked'); cycleCardImage(product.id); }"
                    class="gallery-button absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition-all duration-200"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </template>
              </div>
              <!-- Overlay for readability -->
              <div class="tile-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-all duration-300"></div>
              <!-- Product Info Overlay -->
              <div class="tile-content relative z-20 flex flex-col w-full h-full justify-end p-4 text-left">
                <h3 class="text-lg font-serif font-bold text-white drop-shadow mb-1">{{ product.name }}</h3>
                <div class="flex items-center justify-between w-full mb-2">
                  <div class="price text-lg text-white font-bold drop-shadow">${{ product.price }}</div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <div class="view-details w-full text-center text-white text-sm font-bold mb-1 bg-black/30 py-1 px-2 rounded" style="backdrop-filter: blur(2px);">
                    Click anywhere to view details
                  </div>
                  <button
                    v-if="product.is_retail"
                    @click.stop="redirectToCheckout(product)"
                    class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
                  >
                    <span class="relative z-10">Buy Now (${{ product.price }})</span>
                  </button>
                  <button
                    v-else
                    @click.stop="redirectToCheckout(product)"
                    class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
                  >
                    <span class="relative z-10">Pay Deposit (${{ product.depositPrice }})</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- View All Products Button -->
        <div class="text-center mt-8 mb-12">
          <a href="#shop" 
             class="view-all-btn inline-block px-8 py-3 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-[var(--ksf-cream)] text-[var(--ksf-green)] border-2 border-[var(--ksf-green)] hover:bg-[var(--ksf-green)] hover:text-[var(--ksf-cream)] rounded-lg relative overflow-hidden group" 
             @click.prevent="scrollToShop">
            <span class="relative z-10 flex items-center justify-center gap-2">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 pb-0 mb-0">
      <!-- Unified Product Section Header -->
      <div id="shop" class="mb-6 text-center scroll-mt-24">
        <h2 class="text-2xl font-bold text-[var(--ksf-green)] font-serif mb-1">Shop All Products</h2>
        <p class="text-[var(--ksf-dark)] text-base">
          Browse our full range of handcrafted goods, made in Denver. &nbsp;|&nbsp; <span class="text-[var(--ksf-green)]">Delivery available in Denver area. Some products available for shipping.</span>
        </p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div 
          v-for="product in products" 
          :key="product.id" 
          :id="`product-${product.id}`" 
          class="product-tile relative rounded-2xl shadow-lg transition-all duration-200 flex flex-col items-center max-w-xs mx-auto w-full min-h-[480px] group focus:outline-none focus:ring-2 focus:ring-[var(--ksf-brown)] overflow-hidden cursor-pointer"
          @click="() => { console.log('Tile clicked'); openImageModal(product, getCardImageIndex(product.id)); }"
        >
          <!-- Featured badge for main grid only -->
          <span v-if="featuredProducts.includes(product)" class="absolute top-4 left-4 bg-[var(--ksf-brown)] text-[var(--ksf-cream)] text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1 z-20" style="box-shadow: 0 2px 8px rgba(0,0,0,0.10);">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.44 4.73L5.8 21z"/></svg>
            Featured
          </span>
          <!-- Full Background Image -->
          <div class="absolute inset-0 w-full h-full z-0">
            <img
              :src="product.images[getCardImageIndex(product.id)].src"
              :alt="product.images[getCardImageIndex(product.id)].alt"
              class="w-full h-full object-cover object-center"
            />
            <!-- Next Arrow (only if multiple images) -->
            <template v-if="product.images.length > 1">
              <button
                @click.stop="() => { console.log('Gallery button clicked'); cycleCardImage(product.id); }"
                class="gallery-button absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </template>
          </div>
          <!-- Overlay for readability -->
          <div class="tile-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-all duration-300"></div>
          <!-- Product Info Overlay -->
          <div class="tile-content relative z-20 flex flex-col w-full h-full justify-end p-4 text-left">
            <h3 class="text-lg font-serif font-bold text-white drop-shadow mb-1">{{ product.name }}</h3>
            <div class="flex items-center justify-between w-full mb-2">
              <div class="price text-lg text-white font-bold drop-shadow">${{ product.price }}</div>
            </div>
            <div class="flex flex-col gap-2 w-full">
              <div class="view-details w-full text-center text-white text-sm font-bold mb-1 bg-black/30 py-1 px-2 rounded" style="backdrop-filter: blur(2px);">
                Click anywhere to view details
              </div>
              <button
                v-if="product.is_retail"
                @click.stop="redirectToCheckout(product)"
                class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
              >
                <span class="relative z-10">Buy Now (${{ product.price }})</span>
              </button>
              <button
                v-else
                @click.stop="redirectToCheckout(product)"
                class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
              >
                <span class="relative z-10">Pay Deposit (${{ product.depositPrice }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section with background -->
      <section id="contact" class="text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[var(--ksf-brown)] pb-0 mb-0 scroll-mt-24">
        <div class="flex flex-col items-center justify-center w-full px-4 py-12 max-w-5xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4 text-[var(--ksf-cream)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4" />
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          <h2 class="text-3xl font-bold text-[var(--ksf-cream)] mb-2 font-serif">Contact</h2>
          <div class="w-full flex flex-col md:flex-row md:items-center md:justify-center gap-8 gap-y-8 mt-6">
            <!-- Left: Always centered on mobile, right on desktop -->
            <div class="flex-1 flex flex-col items-center md:items-end border-b md:border-b-0 md:border-r border-[var(--ksf-cream)]/30 pb-8 md:pb-0 md:mb-0 mx-auto md:max-w-xl justify-center">
              <div class="flex flex-col items-center md:items-end px-2 sm:px-6 mx-auto">
                <div class="flex items-center gap-2 mb-2 justify-center mx-auto">
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8 text-[var(--ksf-cream)]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='5' width='18' height='14' rx='2' fill='none' stroke='currentColor' stroke-width='2'/><path d='M3 7l9 6 9-6' stroke='currentColor' stroke-width='2' fill='none'/></svg>
                  <a href="mailto:kingstreetfarms@gmail.com" class="text-2xl font-bold text-[var(--ksf-cream)] underline hover:text-white">kingstreetfarms@gmail.com</a>
                </div>
                <div class="text-lg text-[var(--ksf-cream)] max-w-xs sm:max-w-md font-serif font-semibold mb-1 text-center md:text-right mx-auto">We'd love to hear from you!</div>
                <div class="text-base text-[var(--ksf-cream)] max-w-xs sm:max-w-md text-center md:text-right mx-auto">Questions, feedback, or custom ideas? Drop us a line and our small team will get back to you soon.</div>
              </div>
            </div>
            <!-- Right: Centered on mobile, left on desktop -->
            <div class="flex-1 flex flex-col items-center md:items-start md:pl-8 text-[var(--ksf-cream)] mx-auto md:max-w-xl justify-center mt-8 md:mt-0">
              <div class="text-lg font-semibold mb-1 text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">We're a small, family-run shop in Denver, and we care about every customer and project.</div>
              <div class="text-base mb-3 text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">Whether you want something custom or just have a question, we're here to help and always happy to chat.</div>
              <div class="text-base text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">Already have one of our pieces? Tag us on <span class='underline'>Facebook</span> or <span class='underline'>TikTok</span>—we love seeing your photos and stories!</div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Image Modal -->
    <div 
      v-if="showModal && currentProduct"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="closeModal"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-75"></div>
      <!-- Modal Content: image and details side by side on desktop, stacked on mobile -->
      <div 
        class="relative z-10 max-w-4xl w-full mx-4 flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-lg overflow-hidden"
        style="pointer-events: auto;"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click.stop="closeModal"
          class="absolute top-2 right-2 text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] transition-colors z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Image/Gallery -->
        <div class="w-full sm:w-1/2 flex flex-col items-center justify-center bg-black/80 p-4 relative">
          <div class="relative w-full flex items-center justify-center">
            <img 
              :src="currentProduct.images[currentImageIndex].src"
              :alt="currentProduct.images[currentImageIndex].alt"
              class="w-full h-auto max-h-[60vh] object-contain rounded-lg bg-white"
            >
            <!-- Navigation Arrows (only show if multiple images) -->
            <template v-if="currentProduct.images.length > 1">
              <button 
                @click.stop="prevImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                @click.stop="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </template>
            <!-- Image Counter (only show if multiple images) -->
            <div 
              v-if="currentProduct.images.length > 1"
              class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10"
            >
              {{ currentImageIndex + 1 }} / {{ currentProduct.images.length }}
            </div>
          </div>
        </div>
        <!-- Details -->
        <div class="w-full sm:w-1/2 flex flex-col justify-center p-6 bg-white text-[var(--ksf-dark)]">
          <h2 class="text-2xl font-bold font-serif mb-2 text-[var(--ksf-green)]">{{ currentProduct.name }}</h2>
          <div class="text-lg font-bold mb-2">${{ currentProduct.price }}</div>
          <div class="mb-2 text-sm text-[var(--ksf-brown)] font-mono">{{ currentProduct.dimensions }}</div>
          <div class="mb-4 text-base">{{ currentProduct.description }}</div>
          <ul class="mb-4 text-sm list-disc pl-5">
            <li v-for="feature in currentProduct.features" :key="feature">{{ feature }}</li>
          </ul>
          <div class="mb-4 text-sm">{{ currentProduct.delivery }}</div>
          <div class="flex flex-col gap-2 w-full mt-2">
            <button
              v-if="currentProduct.is_retail"
              @click.stop="redirectToCheckout(currentProduct)"
              class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
            >
              <span class="relative z-10">Buy Now (${{ currentProduct.price }})</span>
            </button>
            <button
              v-else
              @click.stop="redirectToCheckout(currentProduct)"
              class="w-full farmhouse-btn py-2 px-4 text-base font-bold shadow-md transition-all duration-300 mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
            >
              <span class="relative z-10">Pay Deposit (${{ currentProduct.depositPrice }})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Simplified button styles - remove all complex animations */
.product-tile .tile-content button {
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Simple hover effect for buttons */
.product-tile:hover .tile-content button {
  background-color: var(--ksf-green) !important;
  border-color: rgba(255, 255, 255, 0.2);
}

.product-tile .tile-content button:hover {
  background-color: var(--ksf-brown) !important;
  border-color: rgba(255, 255, 255, 0.3);
}

/* Simple active state */
.product-tile .tile-content button:active {
  transform: scale(0.98);
}

/* Remove all complex animations and effects */
.product-tile .tile-content button::before,
.product-tile .tile-content button::after {
  display: none;
}

/* Keep other styles but remove button-specific animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.7s ease-out forwards;
}

/* Gallery button styles - keep simple */
.gallery-button {
  transition: all 0.2s ease;
  opacity: 0;
}

.product-tile:hover .gallery-button {
  opacity: 1;
}

.gallery-button:hover {
  background-color: rgba(0, 0, 0, 0.75) !important;
}

/* Tile overlay transition - keep simple */
.tile-overlay {
  transition: all 0.3s ease;
}

.product-tile:hover .tile-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%);
}

/* View details text - keep simple */
.view-details {
  transition: all 0.2s ease;
}

.product-tile:hover .view-details {
  opacity: 0.8;
}

/* Keep view all button styles but simplify */
.view-all-btn {
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background-color: var(--ksf-green) !important;
  color: var(--ksf-cream) !important;
}

.view-all-btn:active {
  transform: scale(0.98);
}

/* Remove all other keyframe animations */
</style>

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
  is_retail: boolean
}

const showModal = ref(false)
const currentProduct = ref<Product | null>(null)
const currentImageIndex = ref(0)

// Track the main image index for each product card
const cardImageIndexes = ref<{ [key: number]: number }>({})

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
    depositUrl: 'https://buy.stripe.com/8x27sK4Jo8zu9gO0cn6g80d',
    is_retail: true
  },
  {
    id: 2,
    name: 'Waterproof Patio Storage Bench',
    price: 300.00,
    depositPrice: 150.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/open-patio-storage-box.jpg', alt: 'Waterproof patio storage bench with open lid showing spacious interior' },
      { src: '/closed-patio-storage-box.jpg', alt: 'Waterproof patio storage bench with closed lid' }
    ],
    description: 'Our premium waterproof storage bench offers versatile storage with complete weather protection. Perfect for storing cushions, gardening tools, or outdoor toys while providing a cozy spot to relax. Built to withstand Colorado\'s unpredictable weather year-round.',
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
    depositUrl: 'https://buy.stripe.com/28E4gy3Fk5ni2Sq8IT6g801',
    is_retail: false
  },
  {
    id: 3,
    name: 'Backyard Tool Shed',
    price: 300.00,
    depositPrice: 125.00,
    deliveryPrice: 125.00,
    images: [
      { src: '/tool-shed.png', alt: 'Backyard tool shed - vertical storage cabinet with barn-style doors' }
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
    depositUrl: 'https://buy.stripe.com/4gM5kC4Jo02Y50ygbl6g803',
    is_retail: false
  },
  {
    id: 4,
    name: 'Standard Planter Box',
    price: 60.00,
    depositPrice: 30.00,
    deliveryPrice: 15.00,
    images: [
      { src: '/standard-planter-box.jpg', alt: 'Standard planter box - perfect for herbs and flowers' }
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
    depositUrl: 'https://buy.stripe.com/7sYeVcfo2eXS9gOgbl6g80e',
    is_retail: true
  },
  {
    id: 5,
    name: 'Garden Bench',
    price: 100.00,
    depositPrice: 50.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/2-by-4-garden-bench.jpg', alt: 'Handcrafted garden bench - perfect for enjoying your outdoor space' }
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
    depositUrl: 'https://buy.stripe.com/28E5kC1xc7vqfFc2kv6g805',
    is_retail: true
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
    depositUrl: 'https://buy.stripe.com/dRm00i8ZE1728cK1gr6g80c',
    is_retail: true
  },
  {
    id: 7,
    name: 'Half Cord Firewood Rack',
    price: 450.00,
    depositPrice: 200.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/half-cord.jpg', alt: 'Half cord firewood rack with sturdy construction' },
      { src: '/half-cord-2.jpg', alt: 'Half cord firewood rack - alternate view' }
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
    depositUrl: 'https://buy.stripe.com/7sY00iejYeXS9gO3oz6g807',
    is_retail: false
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
    depositUrl: 'https://buy.stripe.com/5kQ8wOfo29Dy3Wugbl6g808',
    is_retail: false
  },
  {
    id: 9,
    name: 'Utility Meter & Panel Cover Cabinet',
    price: 350.00,
    depositPrice: 200.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/utility-cover.jpg', alt: 'Outdoor utility meter and panel cover cabinet' }
    ],
    description: "Protect and conceal your home's electrical meter and panel with this custom-built outdoor cabinet. Designed to shield your utility equipment from the elements while providing extra storage space. Features a weather-resistant sloped roof, double doors for easy access, and a clean look that blends with your home's exterior.",
    features: [
      'Fits standard electrical meters and panels',
      'Weather-resistant construction',
      'Sloped roof for water runoff',
      'Double doors with sturdy handles',
      'Extra storage shelf for tools or supplies',
      'Custom sizing available',
      'Made from premium exterior-grade materials'
    ],
    dimensions: '36" wide x 20" deep x 54" tall (custom sizes available)',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/aFafZg0t8eXSakScZ96g80a',
    is_retail: false
  },
  {
    id: 10,
    name: 'River Resin Dining Table',
    price: 750.00,
    depositPrice: 300.00,
    deliveryPrice: 150.00,
    images: [
      { src: '/resin-table.jpg', alt: 'Resin dining/desk table with unique design' }
    ],
    description: 'A stunning resin dining or desk table that combines functionality with artistic design. Perfect for your dining room or home office, this table features a unique resin design that creates a conversation piece while providing a durable surface for dining, working, or entertaining. Each table is handcrafted with attention to detail and premium materials.',
    features: [
      'Premium resin and wood construction',
      'Unique artistic design elements',
      'Sturdy and durable construction',
      'Perfect for dining rooms or home offices',
      'Seats 4-6 people comfortably',
      'Easy to clean and maintain',
      'Handcrafted in our Denver workshop'
    ],
    dimensions: '72" wide x 36" deep x 30" tall',
    delivery: 'Delivery available within Denver area for $150',
    depositUrl: 'https://buy.stripe.com/7sYbJ0cbQ4je0Ki4sD6g809',
    is_retail: false
  },
  {
    id: 11,
    name: 'River Resin Side Table',
    price: 200.00,
    depositPrice: 100.00,
    deliveryPrice: 15.00,
    images: [
      { src: '/side-table-green.jpg', alt: 'Green side table - natural and earthy tone' },
      { src: '/side-table-blue.jpg', alt: 'Blue side table - perfect for living room or bedroom' },
      { src: '/side-table-black.jpg', alt: 'Black side table - sleek and modern design' }
    ],
    description: 'Add a pop of color to your living space with our premium colorful side tables. $200 gets you one side table, or get a set of two for $350. Available in multiple colors, these tables are crafted with high-quality materials and perfect for complementing your furniture while providing a convenient surface for drinks, books, or decorative items. Each table is handcrafted with care in our Denver workshop.',
    features: [
      'Available in multiple colors (blue, black, green)',
      'Premium materials and construction',
      'Heavy-duty design for stability',
      'Perfect for living rooms, bedrooms, or offices',
      'Easy to clean and maintain',
      'Handcrafted in our Denver workshop',
      'Set of two available for $350'
    ],
    dimensions: '20" wide x 20" deep x 16" tall',
    delivery: 'Delivery available for $15',
    depositUrl: 'https://buy.stripe.com/aFa3cu4Jo4je1OmaR16g80b',
    is_retail: false
  },
  {
    id: 12,
    name: 'Beeswax Candle Set (2-pack)',
    price: 30.00,
    depositPrice: 15.00,
    deliveryPrice: 10.00,
    images: [
      { src: '/two-candle-bees-wax-set.png', alt: 'Two candle beeswax set' },
      { src: '/two-candle-bees-wax-on-window.jpg', alt: 'Two candle beeswax set displayed on window sill' }
    ],
    description: 'Includes 1x 3"x4" and 1x 2"x3" candle. Clean burning, natural, and perfect for cozy evenings or gifts. Made from 100% local beeswax from bees in southwest Denver.',
    features: [
      'Includes two candles',
      '100% pure beeswax',
      'Hand-poured in Denver',
      'Clean burning, no additives',
      'Natural honey scent',
      'Perfect for gifts or home use'
    ],
    dimensions: 'Set: 1x 3\"x4\", 1x 2\"x3\"',
    delivery: 'Delivery available for $10',
    depositUrl: 'https://buy.stripe.com/3cI9AS8ZEaHC8cKcZ96g80f',
    is_retail: true
  }
]);

const openImageModal = (product: Product, imageIndex = 0) => {
  console.log('Opening modal for product', product?.id, 'at index', imageIndex)
  if (!product) {
    console.log('No product provided')
    return
  }
  currentProduct.value = product
  currentImageIndex.value = imageIndex
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
  // Add Google Ads tracking before redirect
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: product.depositPrice,
      items: [{
        item_id: product.id.toString(),
        item_name: product.name
      }]
    })
  }
  
  // Redirect to checkout
  window.open(product.depositUrl, '_blank')
}

// Get the main image index for a product card (default to 0)
const getCardImageIndex = (productId: number) => {
  const index = cardImageIndexes.value[productId] || 0
  console.log('Getting image index for product', productId, ':', index)
  return index
}

// Select favorite products for the hero grid
const featuredProducts = ref([
  products.value.find(p => p.name.includes('Beeswax Candle Set')),
  products.value.find(p => p.name.includes('Wine Rack')),
  products.value.find(p => p.name.includes('Quarter Cord')),
].filter(Boolean))

// Smooth scroll to shop
function scrollToShop() {
  const el = document.getElementById('shop')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function scrollToProduct(productId: number) {
  const el = document.getElementById(`product-${productId}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Add scroll to featured function
function scrollToFeatured() {
  const el = document.getElementById('featured')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

// Update the cycleCardImage function to handle image cycling properly
function cycleCardImage(productId: number) {
  console.log('Cycling image for product', productId)
  const product = products.value.find(p => p.id === productId)
  if (!product || product.images.length <= 1) {
    console.log('No product found or only one image')
    return
  }
  
  const currentIndex = getCardImageIndex(productId)
  const newIndex = (currentIndex + 1) % product.images.length
  console.log('Setting new index to', newIndex)
  // Force a reactive update by creating a new object
  const newIndexes = { ...cardImageIndexes.value }
  newIndexes[productId] = newIndex
  cardImageIndexes.value = newIndexes
}
</script> 