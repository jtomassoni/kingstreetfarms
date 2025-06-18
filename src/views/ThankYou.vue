<template>
  <div class="min-h-screen bg-[var(--ksf-cream)]">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto">
        <!-- Success Icon -->
        <div class="mb-6">
          <svg class="mx-auto h-16 w-16 text-[var(--ksf-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <!-- Thank You Message -->
        <h1 class="text-3xl font-bold text-[var(--ksf-green)] mb-4 font-serif">Thank You for Your Order!</h1>
        <p class="text-lg text-[var(--ksf-dark)] mb-6">
          We've received your order and are excited to start crafting your custom piece. You'll receive an email confirmation shortly with your order details.
        </p>

        <!-- Next Steps -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-[var(--ksf-brown)] border-opacity-20">
          <h2 class="text-xl font-semibold text-[var(--ksf-green)] mb-4 font-serif">What's Next?</h2>
          <ul class="text-left space-y-3 text-[var(--ksf-dark)]">
            <li class="flex items-start">
              <svg class="h-5 w-5 text-[var(--ksf-green)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>We'll review your order and begin crafting your piece within 1-2 business days</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-[var(--ksf-green)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>You'll receive updates on your order status via email</span>
            </li>
            <li class="flex items-start">
              <svg class="h-5 w-5 text-[var(--ksf-green)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>For delivery orders, we'll contact you to schedule delivery once your piece is ready</span>
            </li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="bg-[var(--ksf-cream)] rounded-lg p-6 border border-[var(--ksf-brown)] border-opacity-20">
          <h2 class="text-xl font-semibold text-[var(--ksf-green)] mb-4 font-serif">Questions About Your Order?</h2>
          <p class="text-[var(--ksf-dark)] mb-4">
            We're here to help! Contact us at:
          </p>
          <a href="mailto:kingstreetfarms@gmail.com" class="text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] transition-colors duration-200">
            kingstreetfarms@gmail.com
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Google Ads conversion tracking
onMounted(() => {
  // Check if gtag is available (Google Analytics/Ads)
  if (typeof window.gtag === 'function') {
    // Track purchase conversion
    window.gtag('event', 'purchase', {
      currency: 'USD',
      transaction_id: new URLSearchParams(window.location.search).get('order_id') || 'unknown',
      value: new URLSearchParams(window.location.search).get('amount') || 0,
      items: [{
        item_id: new URLSearchParams(window.location.search).get('product_id') || 'unknown',
        item_name: new URLSearchParams(window.location.search).get('product_name') || 'Custom Order'
      }]
    })

    // Track thank you page view
    window.gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXXX/YYYYYYYYYYYY', // Replace with your actual conversion ID
      transaction_id: new URLSearchParams(window.location.search).get('order_id') || 'unknown'
    })
  }
})
</script>

<script lang="ts">
// Add TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        currency?: string
        transaction_id?: string
        value?: number | string
        items?: Array<{
          item_id: string
          item_name: string
        }>
        send_to?: string
      }
    ) => void
  }
}
</script> 