import userService from "../services/user.service";

const initialState = {
  users: [],
  user: {},
};

export const users = {
  namespaced: true,
  state: initialState,
  actions: {
    async getUsers({ commit }) {
      return userService
        .getUsers()
        .then((res) => {
          commit("getUsersSuccess", res.data.data);
          return Promise.resolve();
        })
        .catch((error) => {
          commit("getUsersFailure");
          return Promise.reject(error);
        });
    },
    async putUser({ commit }, { id, data }) {
      return userService
        .putUser(id, data)
        .then((res) => {
          commit("putUserSuccess", res.data.data);
          return Promise.resolve();
        })
        .catch((error) => {
          commit("putUserFailure");
          return Promise.reject(error);
        });
    },
  },
  mutations: {
    getUsersSuccess(state, users) {
      state.users = users;
    },
    getUsersFailure(state) {
      state.users = null;
    },
    putUserSuccess(state, user) {
      state.user = user;
    },
    putUserFailure(state) {
      state.user = null;
    },
  },
};
