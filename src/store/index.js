import { createStore } from "vuex";
import { auth } from "./auth.module";
import { products } from "./products.module";
import { users } from "./users.module";

export default createStore({
  modules: { auth, products, users },
});
