import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../components/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
