import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    register({ commit }, user) {
      return AuthService.register(user)
        .then((response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        })
        .catch((error) => {
          commit("registerFailure");
          return Promise.reject(error);
        });
    },
    login({ commit }, user) {
      return AuthService.login(user)
        .then((user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        })
        .catch((error) => {
          commit("loginFailure");
          return Promise.reject(error);
        });
    },
    logout({ commit }) {
      AuthService.logout()
        .then(() => {
          commit("logout");
          return Promise.resolve();
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
    refreshToken({ commit }, accessToken) {
      commit("refreshToken", accessToken);
    },
  },
  mutations: {
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = {};
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = {};
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    },
  },
};
