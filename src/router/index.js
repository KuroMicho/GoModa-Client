import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import NotFound from "../components/NotFound.vue";
import Users from "../views/Users.vue";
import Suppliers from "../views/Suppliers.vue";
import Purchases from "../views/Purchases.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
    props: true,
  },
  {
    path: "/product/:id/purchases",
    name: "Purchases",
    component: Purchases,
    props: true,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/suppliers",
    name: "Suppliers",
    component: Suppliers,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "/:pathMatch(.*)*", //will match everything and put it under `$route.params.pathMatch`
    beforeEnter: (to, from, next) => {
      next("/404");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
