<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">King Street Farms</h1>
      <p class="text-xl text-gray-600">Handcrafted Wood Products & Firewood Storage Solutions</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-48 object-cover"
        />
        
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ product.name }}</h2>
          
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          
          <p class="text-2xl font-bold text-gray-900 mb-2">${{ product.price }}</p>
          
          <p v-if="product.delivery" class="text-sm text-gray-500 mb-4">
            Delivery available within Denver area for ${{ product.deliveryFee || 150 }}
          </p>

          <a
            :href="product.stripeLink"
            target="_blank"
            class="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import wineRackImg from '@/assets/wine-rack.jpg'
import quarterCordImg from '@/assets/quarter-cord.jpg'
import halfCordImg from '@/assets/half-cord.jpg'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  stripeLink: string
  delivery?: boolean
  deliveryFee?: number
}

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Handcrafted Wine Rack',
    description: 'Beautifully crafted wooden wine rack, perfect for displaying your favorite bottles. Made with premium materials and expert craftsmanship, this rack combines functionality with rustic charm. Each piece is carefully constructed to ensure durability and style.',
    price: 50.00,
    image: wineRackImg,
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true,
    deliveryFee: 15
  },
  {
    id: 2,
    name: '1/4 Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 2\' x 4\' x 5\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 250.00,
    image: quarterCordImg,
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  },
  {
    id: 3,
    name: '1/2 Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 2\' x 6\' x 6\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 450.00,
    image: halfCordImg,
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  },
  {
    id: 4,
    name: 'Full Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 4\' x 4\' x 8\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 650.00,
    image: halfCordImg,
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  }
])
</script> 