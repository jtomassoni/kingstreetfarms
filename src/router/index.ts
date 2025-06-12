import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ThankYou from '../views/ThankYou.vue'
import ProductDetails from '../views/ProductDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'King Street Farms - Handcrafted Outdoor Goods',
        description: 'Shop handcrafted outdoor goods from King Street Farms. Firewood racks, wine racks, storage solutions, and more - all made to order in Denver.'
      }
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou,
      meta: {
        title: 'Order Confirmation - King Street Farms',
        description: 'Thank you for your order at King Street Farms. We\'re excited to start crafting your custom piece. View your order status and next steps.'
      }
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      meta: {
        title: 'Product Details - King Street Farms',
        description: 'View details, images, and features for this handcrafted product from King Street Farms.'
      }
    }
  ]
})

// Update meta tags for SEO
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title as string || 'King Street Farms - Handcrafted Outdoor Goods'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description as string || 'Shop handcrafted outdoor goods from King Street Farms. Firewood racks, wine racks, storage solutions, and more - all made to order in Denver.')
  }
  
  next()
})

export default router 