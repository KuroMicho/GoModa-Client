import { createStore } from 'vuex'


export default createStore({
  state: {
    products: [],
    onhands: []
  },
  getters: {
    products: state => state.products,
    onhands: state => state.onhands
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setOnhand(state, payload) {
      state.onhands = payload;
    }
  },
  actions: {
    async getProducts({ commit }) {
      let data = [
        {
          "id": 1,
          "barcode": 1243599,
          "name": "Jeans",
          "description": "classic",
          "color": [
              { 
                  "id": 0,
                  "name": "black"
              },
              { 
                  "id": 1,
                  "name": "white"
              }
          ],
          "material": [
              { 
                  "id": 0,
                  "name": "Jeans"
              }
          ],
          "size": 10,
          "price": 20.5,
          "minimum_required": 30,
          "inventory_received": 90,
          "inventory_onhand": 60,
          "inventory_shipped": 0
        },
        {
          "id": 2,
          "barcode": 1243594,
          "name": "Jeans",
          "description": "classic",
          "color": [
              { 
                  "id": 0,
                  "name": "black"
              },
              { 
                  "id": 1,
                  "name": "white"
              }
          ],
          "material": [
              { 
                  "id": 0,
                  "name": "Jeans"
              }
          ],
          "size": 10,
          "price": 20.5,
          "minimum_required": 30,
          "inventory_received": 90,
          "inventory_onhand": 60,
          "inventory_shipped": 0
        },
        {
          "id": 3,
          "barcode": 1243595,
          "name": "Jeans",
          "description": "classic",
          "color": [
              { 
                  "id": 0,
                  "name": "black"
              },
              { 
                  "id": 1,
                  "name": "white"
              }
          ],
          "material": [
              { 
                  "id": 0,
                  "name": "Jeans"
              }
          ],
          "size": 10,
          "price": 20.5,
          "minimum_required": 30,
          "inventory_received": 90,
          "inventory_onhand": 60,
          "inventory_shipped": 0
        }             
      ]

      commit("setProducts", data);

    },
    setProductsOnHand({ commit }, select) {
      commit("setOnhand",  select);
    }
  },
  modules: {
  }
})
