import purchasesService from "../services/purchases.service";

const initialState = {
  purchases: [],
  retrieved: false,
};

export const purchases = {
  namespaced: true,
  state: initialState,
  actions: {
    async postPurchase({ commit }, { id, data }) {
      return purchasesService
        .postPurchase(id, data)
        .then((res) => {
          commit("postPurchaseSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("postPurchaseFailure");
          return Promise.reject(error);
        });
    },
    async getPurchasesByProduct({ commit }, id) {
      return purchasesService
        .getPurchasesByProduct(id)
        .then((res) => {
          commit("getPurchasesSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("getPurchasesFailure");
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    postPurchaseSuccess(state, purchase) {
      state.purchases = [...state.purchases, purchase];
      state.retrieved = true;
    },
    getPurchasesSuccess(state, purchases) {
      state.purchases = purchases;
      state.retrieved = true;
    },
    getPurchasesFailure(state) {
      state.retrieved = false;
    },
    postPurchaseFailure(state) {
      state.retrieved = false;
    },
  },
};
