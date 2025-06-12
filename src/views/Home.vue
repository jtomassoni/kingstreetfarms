<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Hero Section -->
    <section class="relative bg-[var(--ksf-green)] text-[var(--ksf-cream)] py-4 sm:py-6 px-2 flex flex-col items-center justify-center overflow-hidden">
      <!-- Background with gradient overlay -->
      <div class="absolute inset-0 w-full h-full z-0">
        <img src="/hero.png" alt="King Street Farms hero" class="w-full h-full object-cover object-center opacity-20" />
        <div class="absolute inset-0 bg-gradient-to-b from-[var(--ksf-green)]/90 to-[var(--ksf-green)]/70"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-0"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto">
        <!-- Main Heading with Animation -->
        <div class="text-center mb-2 transform transition-all duration-700 ease-out opacity-0 translate-y-4 animate-fade-in-up">
          <h1 class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-1 text-center drop-shadow-lg font-serif">
            Handcrafted Home Goods,<br class="hidden sm:block" />
            <span class="text-[var(--ksf-brown)]">Made in Denver</span>
          </h1>
          <p class="text-base xs:text-lg sm:text-xl max-w-xl mx-auto text-center opacity-90 leading-snug">
            Beautiful, durable furniture and storage for inside and outside your home. 
            Built to last, made to order, delivered fast.
          </p>
        </div>

        <!-- Featured Products Section -->
        <div class="w-full max-w-6xl">
          <!-- Featured Header -->
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 text-[var(--ksf-cream)] font-serif">Featured Items</h2>
          
          <!-- Featured Products Grid with Animation -->
          <div id="featured" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <template v-for="(product, idx) in featuredProducts" :key="idx">
              <div v-if="product" 
                   class="bg-white bg-opacity-95 rounded-xl shadow p-2 flex flex-col items-center hover:shadow-lg transition-shadow duration-200 max-w-xs mx-auto w-full">
                <div class="relative w-full aspect-square mb-2 overflow-hidden rounded-lg max-w-[140px] mx-auto cursor-pointer" @click="scrollToProduct(product.id)">
                  <img :src="product.images[0].src" 
                       :alt="product.images[0].alt" 
                       class="w-full h-full object-contain transition-opacity duration-200 hover:opacity-90" />
                </div>
                <h3 class="text-base font-bold text-[var(--ksf-green)] mb-0.5 text-center">{{ product.name }}</h3>
                <div class="flex flex-col gap-1 w-full">
                  <div class="text-xs text-[var(--ksf-dark)] text-center mb-1">Total: <span class="font-bold">${{ product.price }}</span></div>
                  <button
                    v-if="product.is_retail"
                    @click="redirectToCheckout(product)"
                    class="farmhouse-btn w-full px-2 py-1 text-xs font-semibold shadow hover:shadow-md transition-shadow duration-200 mb-1"
                  >
                    Buy Now (${{ product.price }})
                  </button>
                  <button
                    v-else
                    @click="redirectToCheckout(product)"
                    class="farmhouse-btn w-full px-2 py-1 text-xs font-semibold shadow hover:shadow-md transition-shadow duration-200 mb-1"
                  >
                    Pay Deposit (${{ product.depositPrice }})
                  </button>
                  <button
                    @click="scrollToProduct(product.id)"
                    class="w-full px-2 py-1 text-xs font-semibold border border-[var(--ksf-green)] text-[var(--ksf-green)] bg-transparent rounded hover:bg-[var(--ksf-green)] hover:text-white transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </template>
          </div>

          <!-- View All Products Button -->
          <div class="text-center mt-4">
            <a href="#shop" 
               class="farmhouse-btn inline-block px-6 py-2 text-base font-bold shadow hover:shadow-lg transition-shadow duration-200" 
               @click.prevent="scrollToShop">
              View All Products
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 pb-0 mb-0">
      <!-- Unified Product Section Header -->
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-[var(--ksf-green)] font-serif mb-1">Shop All Products</h2>
        <p class="text-[var(--ksf-dark)] text-base">
          Browse our full range of handcrafted goods, made in Denver. &nbsp;|&nbsp; <span class="text-[var(--ksf-green)]">Delivery available: $40 + mileage</span>
        </p>
      </div>

      <!-- Product Grid -->
      <div id="shop" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div v-for="product in products" :key="product.id" :id="`product-${product.id}`" class="farmhouse-card overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full min-h-[420px] group focus:outline-none focus:ring-2 focus:ring-[var(--ksf-brown)] max-w-xs mx-auto w-full">
          <!-- Product Image -->
          <div 
            class="relative flex flex-col items-center cursor-pointer pt-2 px-2"
            @click="openImageModal(product, getCardImageIndex(product.id))"
          >
            <img 
              :src="product.images[getCardImageIndex(product.id)].src" 
              :alt="product.images[getCardImageIndex(product.id)].alt" 
              class="w-full max-h-36 object-contain rounded transition-opacity"
              style="background: #f8f5f1;"
            >
            <!-- Overlay icon for modal -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity flex items-center justify-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
              </svg>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex flex-col flex-1 p-2 pt-1">
            <div class="mb-1">
              <h3 class="text-base font-semibold text-[var(--ksf-green)] font-serif leading-tight">{{ product.name }}</h3>
              <p class="text-xs text-[var(--ksf-brown)] mt-0.5 font-mono leading-tight">{{ product.dimensions }}</p>
            </div>
            <p class="text-xs text-[var(--ksf-dark)] mb-1 leading-snug">{{ product.description }}</p>
            
            <!-- Features List -->
            <ul class="text-xs text-[var(--ksf-dark)] mb-1 space-y-0.5">
              <li v-for="feature in product.features" :key="feature" class="flex items-start">
                <svg class="h-3 w-3 text-[var(--ksf-green)] mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
              </li>
            </ul>

            <div class="mt-auto pt-1 border-t border-gray-100">
              <div class="text-xs text-[var(--ksf-dark)] text-center mb-1">Total: <span class="font-bold">${{ product.price }}</span></div>
              <button
                v-if="product.is_retail"
                @click="redirectToCheckout(product)"
                class="w-full farmhouse-btn py-1 px-2 text-sm text-center text-white font-semibold hover:bg-[var(--ksf-brown)] transition-colors duration-200"
              >
                Buy Now (${{ product.price }})
              </button>
              <button
                v-else
                @click="redirectToCheckout(product)"
                class="w-full farmhouse-btn py-1 px-2 text-sm text-center text-white font-semibold hover:bg-[var(--ksf-brown)] transition-colors duration-200"
              >
                Pay Deposit (${{ product.depositPrice }})
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section with background -->
      <section id="contact" class="text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[var(--ksf-brown)] pb-0 mb-0">
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
      v-if="showModal && currentProduct" n
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

<style scoped>
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

.animation-delay-300 {
  animation-delay: 300ms;
}
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
  }
]);

const openImageModal = (product: Product, imageIndex = 0) => {
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

// Set the main image index for a product card
const setCardImageIndex = (productId: number, imageIndex: number) => {
  cardImageIndexes.value[productId] = imageIndex
}

// Get the main image index for a product card (default to 0)
const getCardImageIndex = (productId: number) => {
  return cardImageIndexes.value[productId] ?? 0
}

// Select favorite products for the hero grid
const featuredProducts = ref([
  products.value.find(p => p.name.includes('River Resin Side Table')),
  products.value.find(p => p.name.includes('Quarter Cord')),
  products.value.find(p => p.name.includes('Wine Rack')),
  products.value.find(p => p.name.includes('Garden Bench')),
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
</script> 