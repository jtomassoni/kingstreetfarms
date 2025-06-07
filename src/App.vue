<script setup lang="ts">
import { onMounted } from 'vue'
onMounted(() => {
  const loader = document.getElementById('loader')
  if (loader) loader.remove()
})
import Shop from './components/Shop.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Shop />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style>
