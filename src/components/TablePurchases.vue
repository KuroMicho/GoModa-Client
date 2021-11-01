<template>
  <div>
    <ModalPurchase
      :modalIsShow="modalIsShow"
      :productId="productId"
      @close_modal="modalIsShow = false"
    ></ModalPurchase>
    <button class="btn" @click="handlePurchaseModal()">Purchase</button>
    <el-table :data="purchases" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <ul>
            <li>
              date_purchased:
              {{ new Date(props.row.date_purchased).toUTCString() }}
            </li>
            <li>supplier name: {{ props.row.supplier.name }}</li>
            <li>supplier city: {{ props.row.supplier.city }}</li>
            <li>product price: {{ props.row.product.price }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column
        label="Number Purchases"
        prop="product.number_purchases"
      />
      <el-table-column label="ID" prop="product.id" />
      <el-table-column label="Product Name" prop="product.name" />
    </el-table>
  </div>
</template>
<script>
import ModalPurchase from "./ModalPurchase.vue";
import { ElTable, ElTableColumn } from "element-plus";
import { mapState } from "vuex";

export default {
  name: "TablePurchases",
  components: { ElTable, ElTableColumn, ModalPurchase },
  data() {
    return {
      loading: false,
      modalIsShow: false,
    };
  },
  props: {
    productId: {
      type: String,
    },
  },
  computed: { ...mapState("purchases", ["purchases"]) },
  mounted() {
    this.loading = true;
    this.$store.dispatch("purchases/getPurchasesByProduct", this.productId);
  },
  methods: {
    handlePurchaseModal() {
      this.modalIsShow = true;
    },
  },
};
</script>
<style scoped>
.el-table {
  padding: 20px 40px;
}

.el-table * ul {
  margin-left: 20px;
}

.btn {
  color: white;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px 15px;
  margin-top: 20px;
}
</style>
