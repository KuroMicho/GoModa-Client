import { getApi } from "../utils/axios";

class UserService {
  getUsers() {
    return getApi.get("users/");
  }

  putUser(id, data) {
    return getApi.put(`user/${id}`, data);
  }
}

export default new UserService();
