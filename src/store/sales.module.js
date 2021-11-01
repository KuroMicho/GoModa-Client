import SaleService from "../services/sales.service";

const initialState = {
  sales: [],
  retrieved: false,
};

export const sales = {
  namespaced: true,
  state: initialState,
  actions: {
    async postSale({ commit }, { id, data }) {
      return SaleService.postSale(id, data)
        .then((res) => {
          commit("postSaleSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("postSaleFailure");
          return Promise.reject(error);
        });
    },
    async getSalesByProduct({ commit }, id) {
      return SaleService.getSalesByProduct(id)
        .then((res) => {
          commit("getSalesSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("getSalesFailure");
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    postSaleSuccess(state, sale) {
      state.sales = [...state.sales, sale];
      state.retrieved = true;
    },
    getSalesSuccess(state, sales) {
      state.sales = sales;
      state.retrieved = true;
    },
    getSalesFailure(state) {
      state.retrieved = false;
    },
    postSaleFailure(state) {
      state.retrieved = false;
    },
  },
};
