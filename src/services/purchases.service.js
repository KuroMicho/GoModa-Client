import { getApi } from "../utils/axios";

class PurchaseService {
  postPurchase(id, data) {
    return getApi.post(`product/${id}/purchase/`, data);
  }

  getPurchasesByProduct(id) {
    return getApi.get(`product/${id}/purchases/`);
  }
}

export default new PurchaseService();
