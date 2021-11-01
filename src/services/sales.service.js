import { getApi } from "../utils/axios";

class SaleService {
  postSale(id, data) {
    return getApi.post(`product/${id}/sale/`, data);
  }

  getSalesByProduct(id) {
    return getApi.get(`product/${id}/sales/`);
  }
}

export default new SaleService();
