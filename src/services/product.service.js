import { getApi } from "../utils/axios";

class ProductService {
  getProducts() {
    return getApi.get("products/");
  }

  getProduct(id) {
    return getApi.get(`product/${id}/`);
  }

  postProduct(data) {
    return getApi.post(`product/`, data);
  }

  putProduct(data, id) {
    return getApi.put(`product/${id}/`, data);
  }

  deleteProduct(id) {
    return getApi.delete(`product/${id}/`);
  }
}

export default new ProductService();
