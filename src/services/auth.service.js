import { getApi } from "../utils/axios";

class AuthService {
  register(user) {
    return getApi.post("register/", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
