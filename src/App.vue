<template>
  <div class="min-h-screen flex flex-col bg-[var(--ksf-cream)]">
    <!-- Sticky Navigation Bar -->
    <nav class="bg-[var(--ksf-green)] shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between h-14 sm:h-16 items-center">
        <div class="flex items-center space-x-2 sm:space-x-3">
          <button @click="scrollToHero" class="flex items-center space-x-2 focus:outline-none group">
            <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-10 sm:h-8 sm:w-12">
              <path d="M0 24L12 8L24 24L36 12L48 24" stroke="#fff8f1" stroke-width="3" fill="none"/>
              <circle cx="36" cy="12" r="2" fill="#a47551"/>
            </svg>
            <span class="text-lg sm:text-2xl font-bold text-[var(--ksf-cream)] tracking-wide drop-shadow group-hover:underline">King Street Farms</span>
          </button>
        </div>
        <!-- Hamburger for mobile -->
        <button @click="showMobileNav = !showMobileNav" class="sm:hidden flex items-center p-2 rounded-md text-[var(--ksf-cream)] hover:bg-[var(--ksf-brown)] focus:outline-none transition-colors">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <!-- Desktop nav -->
        <div class="hidden sm:flex items-center space-x-4 lg:space-x-6">
          <a href="#" @click.prevent="scrollToHero" class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm sm:text-base">Home</a>
          <a href="#shop" @click.prevent="scrollToShop" class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm sm:text-base">Shop</a>
          <a href="#contact" @click.prevent="scrollToContact" class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm sm:text-base">Contact</a>
        </div>
      </div>
      <!-- Mobile nav dropdown -->
      <div v-if="showMobileNav" class="sm:hidden bg-[var(--ksf-green)] border-t border-[var(--ksf-cream)]/20 px-4 py-2">
        <a href="#" @click.prevent="scrollToHero; showMobileNav = false" class="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)] text-base">Home</a>
        <a href="#shop" @click.prevent="scrollToShop; showMobileNav = false" class="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)] text-base">Shop</a>
        <a href="#contact" @click.prevent="scrollToContact; showMobileNav = false" class="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)] text-base">Contact</a>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-1">
      <router-view></router-view>
    </div>

    <!-- Footer -->
    <footer class="bg-[var(--ksf-green)] text-[var(--ksf-cream)] py-4 sm:py-6">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mb-2 sm:mb-0">
          <a href="#" @click.prevent="scrollToHero" class="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm">Home</a>
          <a href="#shop" @click.prevent="scrollToShop" class="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm">Shop</a>
          <a href="#contact" @click.prevent="scrollToContact" class="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold transition-all duration-200 hover:bg-[var(--ksf-brown)] hover:text-white focus:outline-none text-sm">Contact</a>
        </div>
        <div class="text-xs sm:text-sm text-center sm:text-left">&copy; {{ new Date().getFullYear() }} King Street Farms. All rights reserved.</div>
        <div class="flex space-x-2 sm:space-x-3">
          <!-- Social Icons -->
          <a href="https://facebook.com/" target="_blank" rel="noopener" class="group">
            <span class="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white bg-opacity-20 hover:bg-[#1877f3] transition-colors">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[var(--ksf-cream)] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 2h-3a5 5 0 0 0-5 5v3H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2.293a1 1 0 0 0 .707-1.707l-3-3A1 1 0 0 0 14 9V7a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
              </svg>
            </span>
          </a>
          <a href="https://tiktok.com/" target="_blank" rel="noopener" class="group">
            <span class="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white bg-opacity-20 hover:bg-black transition-colors">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[var(--ksf-cream)] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.75 2v12.25a2.25 2.25 0 1 1-2.25-2.25c.124 0 .246.012.366.03V9.75a5.25 5.25 0 1 0 5.25 5.25V7.5c.414.31.885.55 1.406.68a4.5 4.5 0 0 0 1.044.12V5.75a3.25 3.25 0 0 1-3.25-3.25h-2.566z"/>
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const showMobileNav = ref(false)

function scrollToSection(hash: string, block: ScrollLogicalPosition = 'start') {
  if (route.path === '/') {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block });
      // Also update the URL hash
      router.push({ hash });
    }
  } else {
    router.push({ path: '/', hash });
  }
}

function scrollToHero() {
  scrollToSection('#hero');
}

function scrollToContact() {
  scrollToSection('#contact', 'center');
}

function scrollToShop() {
  scrollToSection('#shop');
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style> 