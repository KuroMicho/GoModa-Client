import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products-filter/`
        );
        if (response.statusText == "OK") {
          commit("setProducts", response.data);
          
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
  modules: {
  }
})
