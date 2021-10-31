import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    products: [],
    onhands: [],
    onhandsFilter: [],
    materials: [],
    colors: [],
    suppliers: [],
  },
  getters: {
    products: state => state.products,
    onhands: state => state.onhands,
    onhandsFilter: state => state.onhandsFilter,
    materials: state => state.materials,
    colors: state => state.colors,
    suppliers: state => state.suppliers,
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setMaterials(state, payload) {
      state.materials = payload;
    },
    setColors(state, payload) {
      state.colors = payload;
    }, 
    setOnhands(state, payload) {
      state.onhands = payload;
    },
    setOnhandsFilter(state, payload) {
      state.onhandsFilter = payload;
    },
    setSuppliers(state, payload) {
      state.suppliers = payload;
    },    
    setOnhandsFilterByAmount(state, payload) {

      let filters = state.onhandsFilter;
      for (let k in filters) {
        if (typeof filters[k] === "object") {
          for (let i = 0; i <= k; i++) {
            if (filters[k].id == payload.productid)
            {
              filters[k].amount = payload.productamount;
            }
          }
        }
      }
    },
    setOnhandsFilterByAmountSupplier(state, payload) {

      let filters = state.onhandsFilter;
      for (let k in filters) {
        if (typeof filters[k] === "object") {
          for (let i = 0; i <= k; i++) {
            if (filters[k].id == payload.productid)
            {
              filters[k].amount = payload.productamount;
              filters[k].suppliername = payload.suppliername;
              filters[k].supplierid = payload.supplierid;
            }
          }
        }
      }
    }    
  },
  actions: {
    async getProducts({ commit }) {
      /*
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
      */

      try {
        const response = await axios.get(
        `http://127.0.0.1:8000/products-filter/`
        );
        if (response.statusText == "OK") {
          commit("setProducts", response.data);

          const colorlist = new Set()
          const materialist = new Set()

          let obj = response.data;

          for (let k in obj) {
            if (typeof obj[k] === "object") {
              for (let i = 0; i <= k; i++) {

                let colors = obj[k].color[i];
                if (colors != undefined)
                  colorlist.add(colors.name);

                let materials = obj[k].material[i];
                if (materials != undefined)
                  materialist.add(materials.name);
              }
            }
          }

          commit("setMaterials", [...materialist]);
          commit("setColors", [...colorlist]);
        }
      } catch (error) {
        console.warn(error);
      }

    },
    async getProductsByName({ commit }, name) {
      try {
        const response = await axios.get(
        `http://127.0.0.1:8000/products-filter/?name__icontains=${name}`
        );
        if (response.statusText == "OK") {
          commit("setProducts", response.data);
        }
      } catch (error) {
        console.warn(error);
      }
    },
        
      /*
      let data = [
        {
          "id": 1,
          "barcode": 1243577,
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
      ];
      commit("setProducts", data);
    },
    setProductsOnHand({ commit }, select) {
      commit("setOnhand",  select);
    }
    */
    async getProductsByItem({ commit }, item) {
      try {
        const response = await axios.get(
        `http://127.0.0.1:8000/products-filter/?search=${item}`
        );
        if (response.statusText == "OK") {
          commit("setProducts", response.data);
        }
      } catch (error) {
        console.warn(error);
      }
            /*
      let data = [
        {
          "id": 1,
          "barcode": 1243577,
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
      ];
      commit("setProducts", data);
    */
    },
    setProductsOnHands({ commit }, select) {

      let objSelected = select;
      for (let k in objSelected) {
        if (typeof objSelected[k] === "object") {
          objSelected[k].amount = 0;
          objSelected[k].suppliername = '';
          objSelected[k].supplierid = undefined;          
        }
      }

      commit("setOnhands",  select);
      commit("setOnhandsFilter",  select);
    },
    setProductsOnHandsFilter({ commit }, select) {
      commit("setOnhandsFilter",  select);
    },
    setProductOnHandsFilterAmount({ commit }, val) {
      commit("setOnhandsFilterByAmount", val);
    },
    setProductOnHandsFilterAmountSupplier({ commit }, val) {
      commit("setOnhandsFilterByAmountSupplier", val);
    },
    async createSale({ commit }, data) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/product/${data.product}/sale/`,
          data
        );
        if (response.statusText == "OK") {
          commit("setProducts", response.data);
        }
      } catch (error) {
        console.warn(error);
      }
    },
    async getSuppliers({ commit }) {
      try {
        const response = await axios.get(
        `http://127.0.0.1:8000/suppliers/`
        );
        if (response.statusText == "OK") {
          commit("setSuppliers", response.data);
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
  modules: {
  }
})
