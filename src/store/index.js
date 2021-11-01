import { createStore } from "vuex";
import { auth } from "./auth.module";
import { products } from "./products.module";
import { users } from "./users.module";
import { suppliers } from "./suppliers.module";
import { purchases } from "./purchases.module";
import { sales } from "./sales.module";

export default createStore({
  modules: { auth, products, users, suppliers, purchases, sales },
});
