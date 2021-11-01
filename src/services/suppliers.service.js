import { getApi } from "../utils/axios";

class SupplierService {
  getSuppliers() {
    return getApi.get("suppliers/");
  }
  postSupplier(data) {
    return getApi.post("supplier/", data);
  }
}

export default new SupplierService();
