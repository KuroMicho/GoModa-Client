import SupplierService from "../services/suppliers.service";

export const suppliers = {
  namespaced: true,
  state: {
    suppliers: [],
    retrieved: false,
  },
  actions: {
    async getSuppliers({ commit }) {
      return SupplierService.getSuppliers()
        .then((res) => {
          commit("getSuppliersSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("getSuppliersFailure");
          return Promise.reject(error);
        });
    },
    async postSupplier({ commit }, data) {
      return SupplierService.postSupplier(data)
        .then((res) => {
          commit("postSupplierSuccess", res.data);
          return Promise.resolve(res);
        })
        .catch((error) => {
          commit("postSupplierFailure");
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    getSuppliersSuccess(state, suppliers) {
      state.suppliers = suppliers;
      state.retrieved = true;
    },
    postSupplierSuccess(state, supplier) {
      state.suppliers = [...state.suppliers, supplier];
      state.retrieved = true;
    },
    getSuppliersFailure(state) {
      state.retrieved = false;
    },
    postSupplierFailure(state) {
      state.retrieved = false;
    },
  },
};
