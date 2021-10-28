import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductsOnHand from '../views/ProductsOnHand'
import SaleOrder from '../views/SaleOrder'

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
  },
  {
    path: '/sale-order',
    name: 'SaleOrder',
    component: SaleOrder
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
