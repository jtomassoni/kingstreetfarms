<template>
  <v-container class="shop-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-6">King Street Farms</h1>
        <p class="text-center mb-8">Handcrafted Wood Products & Firewood Storage Solutions</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <v-card class="product-card" elevation="2">
          <v-img
            :src="product.image"
            height="200"
            cover
            class="product-image"
          ></v-img>
          
          <v-card-title class="text-h6">{{ product.name }}</v-card-title>
          
          <v-card-text>
            <p class="text-body-1">{{ product.description }}</p>
            <p class="text-h6 mt-2">${{ product.price }}</p>
            <p v-if="product.delivery" class="text-caption mt-1">
              Delivery available within Denver area for ${{ product.deliveryFee || 150 }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              color="primary"
              :href="product.stripeLink"
              target="_blank"
              class="buy-button"
            >
              Buy Now
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
    image: '/src/assets/wine-rack.jpg',
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true,
    deliveryFee: 15
  },
  {
    id: 2,
    name: '1/4 Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 2\' x 4\' x 5\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 200.00,
    image: '/src/assets/quarter-cord.jpg',
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  },
  {
    id: 3,
    name: '1/2 Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 2\' x 6\' x 6\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 350.00,
    image: '/src/assets/half-cord.jpg',
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  },
  {
    id: 4,
    name: 'Full Cord Firewood Rack',
    description: 'Custom-built firewood storage rack made from pressure-treated lumber with galvanized tin roof. Dimensions: 4\' x 4\' x 8\'. Built to last through Colorado winters with no wobbles, rust, or squeaky plastic. Clean, solid construction that looks great in any yard.',
    price: 450.00,
    image: '/src/assets/half-cord.jpg',
    stripeLink: 'https://buy.stripe.com/test_eVq8wOcbQ8zugJg6AL6g800',
    delivery: true
  }
])
</script>

<style scoped>
.shop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-image {
  object-fit: cover;
}

.buy-button {
  margin-top: auto;
}

@media (max-width: 600px) {
  .shop-container {
    padding: 1rem;
  }
  
  .product-card {
    margin-bottom: 1rem;
  }
}
</style> 