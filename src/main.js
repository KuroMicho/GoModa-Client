import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueChartkick from "vue-chartkick";

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

createApp(App)
  .use(store)
  .use(router)
  .use(VueChartkick)
  .mount("#app");
