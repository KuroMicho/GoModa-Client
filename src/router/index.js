import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductsOnHand from '../views/ProductsOnHand'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },  
  {
    path: '/products',
    name: 'ProductsOnHand',
    component: ProductsOnHand
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
