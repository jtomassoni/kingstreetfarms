<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Hero Section -->
    <section id="hero" class="relative bg-[var(--ksf-green)] text-[var(--ksf-cream)] flex flex-col items-center justify-start overflow-visible min-h-0 h-auto min-h-[350px] sm:min-h-[400px] max-h-none pt-6 sm:pt-8 pb-2 sm:pb-8 sm:min-h-[600px] scroll-mt-24" style="min-height:0; min-height:100vh;">
      <!-- Background with gradient overlay -->
      <div class="absolute inset-0 w-full h-full z-0">
        <img src="/hero.png" alt="King Street Farms hero" class="w-full h-full object-cover object-center opacity-10" />
        <div class="absolute inset-0 bg-gradient-to-b from-[var(--ksf-green)]/95 to-[var(--ksf-green)]/80"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-0"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto items-center justify-start pt-6 sm:pt-8 pb-6 sm:pb-8 px-4 sm:px-6">
        <!-- Main Heading with Animation -->
        <div class="text-center mb-6 sm:mb-8 mt-2 sm:mt-4 transform transition-all duration-700 ease-out animate-fade-in-up">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center drop-shadow-lg font-serif leading-tight">
            Handcrafted Home Goods, <span class="text-[var(--ksf-brown)]">Made in Denver</span>
          </h1>
          <p class="text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto text-center opacity-90 leading-snug mb-0">
            Beautiful, durable furniture and storage for your home, alongside local honey and beeswax products that help support our pollinators.
          </p>
        </div>
      </div>

      <!-- Featured Products Grid Overlapping Hero -->
      <div class="relative z-20 w-full flex flex-col items-center -mt-2 sm:-mt-8">
        <div class="w-full flex flex-col gap-3 sm:gap-4 px-3 sm:px-4 sm:max-w-5xl sm:flex-row sm:overflow-visible sm:gap-6 sm:justify-center">
          <template v-for="(product, idx) in featuredProducts" :key="idx">
            <div v-if="product"
              class="product-tile featured-tile relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl transition-all duration-200 flex flex-col items-center w-full max-w-[280px] sm:max-w-xs min-h-[320px] sm:min-h-[420px] max-h-[480px] sm:max-h-[600px] group cursor-pointer border-2 sm:border-4 border-[var(--ksf-green)] mx-auto sm:mx-0 overflow-hidden"
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
                <!-- Multiple Images Indicator -->
                <div v-if="product.images.length > 1" class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1.5 sm:py-2 rounded-full text-xs flex items-center gap-1 z-10 gallery-count-tall" style="min-height:2.2rem;">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ product.images.length }}
                </div>
              </div>
              <!-- Overlay for readability -->
              <div class="tile-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-all duration-300"></div>
              <!-- Product Info Overlay -->
              <div class="tile-content relative z-20 flex flex-col w-full h-full min-h-[200px] sm:min-h-[320px] justify-end p-3 sm:p-4 text-left tile-content-bottom">
                <h3 class="text-base sm:text-lg font-serif font-bold text-white drop-shadow mb-1">{{ product.name }}</h3>
                <div class="flex items-center justify-between w-full mb-2">
                  <div class="price text-base sm:text-lg text-white font-bold drop-shadow">${{ product.price }}</div>
                </div>
                <div class="flex flex-col gap-1.5 sm:gap-2 w-full">
                  <div v-if="product && featuredProducts.includes(product)" class="featured-spacer"></div>
                  <!-- Centered view details indicator for desktop, bottom bar for mobile -->
                  <span class="view-details-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-eye" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="indicator-text">View details</span>
                  </span>
                  <!-- Mobile bottom bar for tap for details -->
                  <span class="mobile-tap-bar" style="display: none;">Tap for details</span>
                  <button
                    v-if="product.is_retail"
                    @click.stop="redirectToCheckout(product)"
                    class="w-full farmhouse-btn py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base font-bold shadow-md transition-all duration-300 mb-1 sm:mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
                  >
                    <span class="relative z-10">Buy Now (${{ product.price }})</span>
                  </button>
                  <button
                    v-else
                    @click.stop="redirectToCheckout(product)"
                    class="w-full farmhouse-btn py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base font-bold shadow-md transition-all duration-300 mb-1 sm:mb-2 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
                  >
                    <span class="relative z-10">Pay Deposit (${{ product.depositPrice }})</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- View All Products Button -->
        <div class="text-center mt-2 sm:mt-2 mb-2 sm:mb-2">
          <a href="#shop" 
             class="view-all-btn inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-[var(--ksf-cream)] text-[var(--ksf-green)] border-2 border-[var(--ksf-green)] hover:bg-[var(--ksf-green)] hover:text-[var(--ksf-cream)] rounded-lg relative overflow-hidden group" 
             @click.prevent="scrollToShop">
            <span class="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transform transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-4 pb-0 mb-0">
      <!-- Unified Product Section Header -->
      <div id="shop" class="mb-4 sm:mb-6 text-center scroll-mt-24 py-8 sm:py-12">
        <h2 class="text-3xl sm:text-4xl font-bold text-[var(--ksf-green)] font-serif mb-2">Shop All Products</h2>
        <p class="text-base sm:text-lg text-[var(--ksf-dark)] max-w-2xl mx-auto">
          Browse our full range of handcrafted goods, made in Denver. &nbsp;|&nbsp; <span class="text-[var(--ksf-green)]">Delivery available in Denver area. Some products available for shipping.</span>
        </p>
      </div>

      <!-- Product Grid -->
      <div class="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="border-t border-gray-300">
          <template v-for="category in productCategories" :key="category.name">
            <div v-if="category.products.length > 0" class="accordion-item border-b border-gray-300">
              <h2 @click="toggleCategory(category.name)" class="accordion-header flex justify-between items-center p-4 sm:p-6 cursor-pointer hover:bg-[var(--ksf-green)]/10 transition-colors">
                  <span class="text-xl sm:text-2xl font-serif font-bold text-[var(--ksf-green)]">{{ category.name }}</span>
                  <svg class="w-6 h-6 text-[var(--ksf-green)] transition-transform duration-300" :class="{ 'rotate-180': isCategoryOpen(category.name) }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </h2>
  
              <div v-if="isCategoryOpen(category.name)" class="accordion-content p-4 sm:p-6 bg-white/50">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div 
                      v-for="product in category.products" 
                      :key="product.id" 
                      :id="`product-${product.id}`" 
                      class="product-tile relative rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg transition-all duration-200 flex flex-col items-center max-w-[280px] sm:max-w-xs mx-auto w-full min-h-[420px] sm:min-h-[480px] group focus:outline-none focus:ring-2 focus:ring-[var(--ksf-brown)] overflow-hidden cursor-pointer"
                      @click="() => { console.log('Tile clicked'); openImageModal(product, getCardImageIndex(product.id)); }"
                    >
                      <!-- Featured badge for main grid only -->
                      <span v-if="featuredProducts.includes(product)" class="absolute top-3 sm:top-4 left-3 sm:left-4 bg-[var(--ksf-brown)] text-[var(--ksf-cream)] text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-full shadow flex items-center gap-1 z-20 featured-badge-mobile-fix" style="box-shadow: 0 2px 8px rgba(0,0,0,0.10); min-height: 2.2rem;">
                        <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.44 4.73L5.8 21z"/></svg>
                        Featured
                      </span>
                      <!-- Full Background Image -->
                      <div class="absolute inset-0 w-full h-full z-0">
                        <img
                          :src="product.images[getCardImageIndex(product.id)].src"
                          :alt="product.images[getCardImageIndex(product.id)].alt"
                          class="w-full h-full object-cover object-center"
                        />
                        <!-- Multiple Images Indicator -->
                        <div v-if="product.images.length > 1" class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1.5 sm:py-2 rounded-full text-xs flex items-center gap-1 z-10 gallery-count-tall" style="min-height:2.2rem;">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {{ product.images.length }}
                        </div>
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
                          <!-- Centered view details indicator for desktop, bottom bar for mobile -->
                          <span class="view-details-indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-eye" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span class="indicator-text">View details</span>
                          </span>
                          <!-- Mobile bottom bar for tap for details -->
                          <span class="mobile-tap-bar" style="display: none;">Tap for details</span>
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
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>

      <!-- Whitespace separator before contact section removed -->
      <!-- Contact Section visually merged with footer -->
      <section id="contact" class="text-center w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[var(--ksf-green)] pb-0 mb-0 scroll-mt-24" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="flex flex-col items-center justify-center w-full px-4 py-8 sm:py-12 max-w-5xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mb-3 sm:mb-4 text-[var(--ksf-cream)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v4a4 4 0 01-8 0v-4" />
            <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2" />
            <path d="M3 7l9 6 9-6" stroke="currentColor" stroke-width="2" fill="none" />
          </svg>
          <h2 class="text-2xl sm:text-3xl font-bold text-[var(--ksf-cream)] mb-2 font-serif">Contact</h2>
          <div class="w-full flex flex-col md:flex-row md:items-center md:justify-center gap-6 sm:gap-8 gap-y-6 sm:gap-y-8 mt-4 sm:mt-6">
            <!-- Left: Always centered on mobile, right on desktop -->
            <div class="flex-1 flex flex-col items-center md:items-end border-b md:border-b-0 md:border-r border-[var(--ksf-cream)]/30 pb-6 sm:pb-8 md:pb-0 md:mb-0 mx-auto md:max-w-xl justify-center">
              <div class="flex flex-col items-center md:items-end px-2 sm:px-6 mx-auto">
                <div class="flex items-center gap-2 mb-2 justify-center mx-auto">
                  <svg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6 sm:h-8 sm:w-8 text-[var(--ksf-cream)]' fill='none' viewBox='0 0 24 24' stroke='currentColor'><rect x='3' y='5' width='18' height='14' rx='2' fill='none' stroke='currentColor' stroke-width='2'/><path d='M3 7l9 6 9-6' stroke='currentColor' stroke-width='2' fill='none'/></svg>
                  <a href="mailto:kingstreetfarms@gmail.com" class="text-lg sm:text-2xl font-bold text-[var(--ksf-cream)] underline hover:text-white">kingstreetfarms@gmail.com</a>
                </div>
                <div class="text-base sm:text-lg text-[var(--ksf-cream)] max-w-xs sm:max-w-md font-serif font-semibold mb-1 text-center md:text-right mx-auto">We'd love to hear from you!</div>
                <div class="text-sm sm:text-base text-[var(--ksf-cream)] max-w-xs sm:max-w-md text-center md:text-right mx-auto">Questions, feedback, or custom ideas? Drop us a line and our small team will get back to you soon.</div>
              </div>
            </div>
            <!-- Right: Centered on mobile, left on desktop -->
            <div class="flex-1 flex flex-col items-center md:items-start md:pl-8 text-[var(--ksf-cream)] mx-auto md:max-w-xl justify-center mt-6 sm:mt-8 md:mt-0">
              <div class="text-base sm:text-lg font-semibold mb-1 text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">We're a small, family-run shop in Denver, and we care about every customer and project.</div>
              <div class="text-sm sm:text-base mb-2 sm:mb-3 text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">Whether you want something custom or just have a question, we're here to help and always happy to chat.</div>
              <div class="text-sm sm:text-base text-center md:text-left max-w-xs sm:max-w-md mx-auto md:mx-0">Already have one of our pieces? Tag us on <span class='underline'>Facebook</span> or <span class='underline'>TikTok</span>—we love seeing your photos and stories!</div>
            </div>
          </div>
        </div>
      </section>

    <!-- Image Modal -->
    <div 
      v-if="showModal && currentProduct"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-hidden"
      @click="closeModal"
      :class="{ 'overflow-hidden': showModal }"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-75"></div>
      <!-- Modal Content: image and details side by side on desktop, stacked on mobile -->
      <div 
        class="relative z-10 max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center sm:items-stretch bg-white rounded-lg overflow-hidden"
        style="pointer-events: auto; max-height: 90vh;"
        @click.stop
      >
        <!-- Close Button -->
        <button 
          @click.stop="closeModal"
          class="absolute top-2 right-2 text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] transition-colors z-20 p-1 sm:p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Image/Gallery -->
        <div class="w-full sm:w-1/2 flex flex-col items-center justify-center bg-black/80 p-3 sm:p-4 relative">
          <div class="relative w-full flex items-center justify-center">
            <img 
              :src="currentProduct.images[currentImageIndex].src"
              :alt="currentProduct.images[currentImageIndex].alt"
              class="w-full h-auto max-h-[30vh] sm:max-h-[50vh] object-contain rounded-lg bg-white"
            >
            <!-- Navigation Arrows (only show if multiple images) -->
            <template v-if="currentProduct.images.length > 1">
              <button 
                @click.stop="prevImage"
                class="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                @click.stop="nextImage"
                class="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity z-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </template>
            <!-- Image Counter (only show if multiple images) -->
            <div 
              v-if="currentProduct.images.length > 1"
              class="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm z-10"
            >
              {{ currentImageIndex + 1 }} / {{ currentProduct.images.length }}
            </div>
          </div>
        </div>
        <!-- Details -->
        <div class="w-full sm:w-1/2 flex flex-col bg-white text-[var(--ksf-dark)]">
          <!-- Scrollable content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-6 max-h-[40vh] sm:max-h-none">
            <h2 class="text-xl sm:text-2xl font-bold font-serif mb-2 text-[var(--ksf-green)]">{{ currentProduct.name }}</h2>
            <div class="text-base sm:text-lg font-bold mb-2">${{ currentProduct.price }}</div>
            <div class="text-xs sm:text-sm text-[var(--ksf-brown)] font-mono mb-2">{{ currentProduct.dimensions }}</div>
            <div class="text-sm sm:text-base mb-3 sm:mb-4">{{ currentProduct.description }}</div>
            <ul class="mb-3 sm:mb-4 text-xs sm:text-sm list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
              <li v-for="feature in currentProduct.features" :key="feature">{{ feature }}</li>
            </ul>
            <div class="text-xs sm:text-sm mb-3 sm:mb-4">{{ currentProduct.delivery }}</div>
          </div>
          <!-- Fixed button section -->
          <div class="p-4 sm:p-6 bg-white border-t border-gray-100 sticky bottom-0">
            <button
              v-if="currentProduct.is_retail"
              @click.stop="redirectToCheckout(currentProduct)"
              class="w-full farmhouse-btn py-2.5 px-4 text-sm sm:text-base font-bold shadow-md transition-all duration-300 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
            >
              <span class="relative z-10">Buy Now (${{ currentProduct.price }})</span>
            </button>
            <button
              v-else
              @click.stop="redirectToCheckout(currentProduct)"
              class="w-full farmhouse-btn py-2.5 px-4 text-sm sm:text-base font-bold shadow-md transition-all duration-300 bg-[var(--ksf-green)] text-white border-none relative overflow-hidden group"
            >
              <span class="relative z-10">Pay Deposit (${{ currentProduct.depositPrice }})</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[var(--ksf-green)] text-[var(--ksf-cream)] pt-0 pb-4 sm:pb-6" style="margin-top: 0; padding-top: 0; border-top: none;">
      <!-- ... existing footer content ... -->
    </footer>
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

/* Tile overlay transition - keep simple */
.tile-overlay {
  transition: all 0.3s ease;
}

.product-tile:hover .tile-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%);
}

/* Super obvious view details indicator, centered and away from badge */
.product-tile {
  position: relative;
}
.product-tile .view-details {
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1);
  text-shadow: 0 1px 2px rgba(0,0,0,0.10);
  font-weight: 500;
  z-index: 30;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.08);
  border: 1.5px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  background: rgba(30,30,30,0.28);
  color: rgba(255,255,255,0.82);
  letter-spacing: 0.02em;
}
.product-tile:hover .view-details,
.product-tile:focus-within .view-details {
  opacity: 1;
  pointer-events: auto;
  background: rgba(20,20,20,0.55);
  border-color: rgba(255,255,255,0.32);
  color: #fff;
  transform: translate(-50%, 0) scale(1.08);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 8px 0 rgba(0,0,0,0.12);
}

/* Remove any gap between contact and footer */
#contact {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
  border-bottom: none !important;
}
footer {
  margin-top: 0 !important;
  padding-top: 0 !important;
  border-top: none !important;
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

/* Ensure modal content is properly contained */
.fixed {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.featured-view-details {
  top: 2rem;
}

.featured-tile .view-details {
  font-weight: 600;
  box-shadow: 0 8px 32px 0 rgba(218, 165, 32, 0.18), 0 2px 8px 0 rgba(218, 165, 32, 0.12), 0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.08);
  border: 1.5px solid rgba(218, 165, 32, 0.28);
}

.featured-tile:hover .view-details,
.featured-tile:focus-within .view-details {
  background: rgba(218, 165, 32, 0.18);
  border-color: rgba(218, 165, 32, 0.45);
  color: #fffbe6;
  box-shadow: 0 12px 36px 0 rgba(218, 165, 32, 0.28), 0 4px 16px 0 rgba(218, 165, 32, 0.18);
  transform: translate(-50%, 0) scale(1.12);
}

.regular-view-details {
  top: 4rem;
}

/* On mobile, push tile-content closer to the bottom for hero featured tiles */
.tile-content-bottom {
  justify-content: flex-end;
  padding-bottom: 1.1rem;
}

@media (max-width: 640px) {
  /* Featured tiles: more padding at bottom, less button margin */
  .featured-tile .tile-content-bottom {
    padding-bottom: 4.2rem;
  }
  .featured-tile .tile-content-bottom button {
    margin-bottom: 0.5rem;
  }
  /* Regular tiles: less padding at bottom, more button margin */
  .product-tile:not(.featured-tile) .tile-content {
    padding-bottom: 1.5rem;
  }
  .product-tile:not(.featured-tile) .tile-content button {
    margin-bottom: 0.9rem;
  }
  .mobile-tap-bar {
    bottom: 0.3rem;
  }
  .featured-badge-mobile-fix {
    top: 0.5rem !important;
    left: 0.5rem !important;
    z-index: 30;
  }
  .featured-view-details {
    top: 2.7rem !important;
  }
  .view-details-indicator {
    position: absolute !important;
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
    display: flex !important;
    align-items: center;
    gap: 0.5em;
    background: rgba(30,30,30,0.18);
    border-radius: 9999px;
    padding: 0.35em 1em;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border: 1px solid rgba(255,255,255,0.12);
    z-index: 30;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .product-tile:hover .view-details-indicator,
  .product-tile:focus-within .view-details-indicator {
    opacity: 1;
  }
  .mobile-tap-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    bottom: 0.6rem;
    transform: translateX(-50%);
    width: 65%;
    min-width: 70px;
    max-width: 90%;
    background: rgba(30,30,30,0.62);
    color: #fff;
    font-size: 0.78em;
    padding: 0.13em 0.5em 0.11em 0.5em;
    border-radius: 9999px;
    z-index: 40;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
    pointer-events: none;
    font-weight: 500;
    letter-spacing: 0.01em;
    opacity: 0.88;
  }
  .featured-spacer {
    flex-grow: 1;
    min-height: 60px;
  }
}

/* Desktop: keep center indicator */
.desktop-view-details {
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  background: rgba(30,30,30,0.28);
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 9999px;
  padding: 0.5rem 1.1rem;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.08);
  color: rgba(255,255,255,0.82);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.product-tile:hover .desktop-view-details,
.product-tile:focus-within .desktop-view-details {
  opacity: 1;
  pointer-events: auto;
}

/* Mobile: small eye icon in bottom-right */
.mobile-view-details {
  display: none;
}
@media (max-width: 640px) {
  .desktop-view-details {
    display: none !important;
  }
  .mobile-view-details {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0.7rem;
    bottom: 0.7rem;
    z-index: 30;
    background: rgba(30,30,30,0.18);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 9999px;
    padding: 0.18rem 0.18rem 0.12rem 0.18rem;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    color: rgba(255,255,255,0.65);
    width: 2.1rem;
    height: 2.1rem;
    font-size: 1.1rem;
    opacity: 1;
    pointer-events: none;
  }
  .mobile-view-details svg {
    width: 1.3em;
    height: 1.3em;
    color: rgba(255,255,255,0.65);
  }
}

/* Centered indicator for desktop only */
.view-details-indicator {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 0.5em;
  background: rgba(30,30,30,0.18);
  border-radius: 9999px;
  padding: 0.35em 1em;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255,255,255,0.85);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
  border: 1px solid rgba(255,255,255,0.12);
  z-index: 30;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}
.product-tile:hover .view-details-indicator,
.product-tile:focus-within .view-details-indicator {
  opacity: 1;
}

/* Mobile: bottom bar for tap for details */
@media (max-width: 640px) {
  .view-details-indicator {
    display: none !important;
  }
  .mobile-tap-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
    width: 65%;
    min-width: 70px;
    max-width: 90%;
    background: rgba(30,30,30,0.62);
    color: #fff;
    font-size: 0.78em;
    padding: 0.13em 0.5em 0.11em 0.5em;
    border-radius: 9999px;
    z-index: 40;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.13);
    pointer-events: none;
    font-weight: 500;
    letter-spacing: 0.01em;
    opacity: 0.88;
  }
}

.mobile-tap-bar {
  display: none;
}
</style>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

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
  category: 'Save Our Pollinators' | 'Indoors' | 'Outdoors'
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
    is_retail: true,
    category: 'Indoors'
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
    is_retail: false,
    category: 'Outdoors'
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
    is_retail: false,
    category: 'Outdoors'
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
    is_retail: true,
    category: 'Outdoors'
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
    is_retail: true,
    category: 'Outdoors'
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
    is_retail: true,
    category: 'Outdoors'
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
    is_retail: false,
    category: 'Outdoors'
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
    is_retail: false,
    category: 'Outdoors'
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
    is_retail: false,
    category: 'Outdoors'
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
    is_retail: false,
    category: 'Indoors'
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
    is_retail: false,
    category: 'Indoors'
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
    is_retail: true,
    category: 'Save Our Pollinators'
  },
  {
    id: 13,
    name: 'Organic Local Honey - 8 oz',
    price: 12.00,
    depositPrice: 12.00,
    deliveryPrice: 10.00,
    images: [
      { src: '/kings-queen-honey-small-jar-white.jpg', alt: '8 oz jar of organic local honey' }
    ],
    description: 'Pure, organic local honey. Straight from the comb. From our hives to your home, this small-batch honey is harvested right here in Denver, Colorado, where bees forage on wildflowers, clover, and native blooms. It is lightly strained to ensure cleanliness but is never heated or processed, preserving its natural enzymes and pollen.',
    features: [
      '100% raw organic local honey',
      'Chemical-free and naturally produced',
      'Bottled in small batches with care',
      'Lightly strained, never processed',
      'Classic glass jar with rustic lid',
      'Hand-labeled tag'
    ],
    dimensions: '8 oz jar',
    delivery: 'Delivery available for $10',
    depositUrl: 'https://buy.stripe.com/5kQ14mb7MaHC1OmcZ96g80g',
    is_retail: true,
    category: 'Save Our Pollinators'
  },
  {
    id: 14,
    name: 'Organic Local Honey - 32 oz',
    price: 32.00,
    depositPrice: 32.00,
    deliveryPrice: 10.00,
    images: [
      { src: '/kings-queen-jars-in-window.jpg', alt: '32 oz jar of organic local honey' }
    ],
    description: 'A full quart of liquid gold—ideal for tea lovers, home bakers, or families who go through the good stuff fast. Our organic local honey is farm-fresh and sealed tight in a reusable mason jar. Harvested from our Denver hives, it is lightly strained for purity but never heated or processed.',
    features: [
      '100% raw organic local honey',
      'Chemical-free and naturally produced',
      'Bottled in small batches with care',
      'Lightly strained, never processed',
      'Reusable mason jar',
      'Hand-labeled tag'
    ],
    dimensions: '32 oz jar',
    delivery: 'Delivery available for $10',
    depositUrl: 'https://buy.stripe.com/7sYfZgdfUdTO8cK6AL6g80h',
    is_retail: true,
    category: 'Save Our Pollinators'
  },
  {
    id: 15,
    name: 'Beeswaxed Pinecone Firestarters (4-Pack)',
    price: 12.00,
    depositPrice: 12.00,
    deliveryPrice: 10.00,
    images: [
      { src: '/firestarters.jpg', alt: 'A 4-pack of beeswax-dipped pinecone firestarters' }
    ],
    description: "Need a little spark? These handcrafted pinecone firestarters are dipped in pure beeswax for a long, even burn that makes lighting your fireplace, fire pit, or campfire a breeze. No chemicals. No paraffin. Just beeswax, twine, and pinecones — straight from nature.",
    features: [
      '4-pack of assorted pinecones',
      'Sealed in clear compostable bag with kraft paper label',
      'Burns 8–10 minutes each',
      'Handmade by King Street Farms in Denver, CO'
    ],
    dimensions: '4-pack (shapes and sizes vary)',
    delivery: 'Delivery available for $10',
    depositUrl: 'https://buy.stripe.com/9B6cN46Rw8zu9gO2kv6g80i',
    is_retail: true,
    category: 'Save Our Pollinators'
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

// State for collapsible categories
const openCategories = ref(['Save Our Pollinators', 'Indoors', 'Outdoors']); // Default to all open

const toggleCategory = (categoryName: string) => {
  const index = openCategories.value.indexOf(categoryName);
  if (index > -1) {
    openCategories.value.splice(index, 1);
  } else {
    openCategories.value.push(categoryName);
  }
};

const isCategoryOpen = (categoryName: string) => {
  return openCategories.value.includes(categoryName);
};

// Group products by category
const productCategories = computed(() => {
  const categories = ['Save Our Pollinators', 'Indoors', 'Outdoors'];
  const grouped: { [key: string]: Product[] } = {};

  // Initialize with all categories to maintain order
  for (const category of categories) {
    grouped[category] = [];
  }

  // Group products
  for (const product of products.value) {
    if (product.category in grouped) {
      grouped[product.category].push(product);
    }
  }

  // Return as an array of objects
  return Object.entries(grouped).map(([name, products]) => ({ name, products }));
});

// Select favorite products for the hero grid
const featuredProducts = ref([
  products.value.find(p => p.name.includes('Beeswax Candle Set')),
  products.value.find(p => p.name.includes('Wine Rack')),
  products.value.find(p => p.name.includes('Quarter Cord')),
  products.value.find(p => p.name.includes('Honey - 8 oz')),
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

// Add watch for modal state to prevent background scrolling
watch(showModal, (newValue) => {
  if (newValue) {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden'
  } else {
    // Restore scrolling when modal is closed
    document.body.style.overflow = ''
  }
})

// Tooltip for first-time mobile users
const showMobileTooltip = ref(false)
</script> 