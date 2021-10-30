import tokenService from "../services/token.service";
import { getApi } from "./axios";

const setup = (store) => {
  getApi.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  getApi.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalConfig = error.config;

      if (originalConfig.url !== "/login/" && error.response) {
        // Access Token was expired

        if (error.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const refresh = JSON.parse(localStorage.getItem("user"))
              .refresh_token;
            const isRefreshTokenExpired = (token) =>
              Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;

            if (isRefreshTokenExpired(refresh)) {
              tokenService.removeUser();
            } else {
              const rs = await getApi.post("login/refresh/", {
                refresh: tokenService.getLocalRefreshToken(),
              });

              const { access } = rs.data;

              store.dispatch("auth/refreshToken", access);
              tokenService.updateLocalAccessToken(access);

              return new Promise((resolve, reject) => {
                getApi(originalConfig)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            }
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
