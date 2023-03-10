import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

import setup from "./utils/setupInterceptor";

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

setup(store);

createApp(App).use(store).use(router).use(VueChartkick).mount("#app");
