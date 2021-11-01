<template>
  <div>
    <ModalSale
      :modalIsShow="modalIsShow"
      :productId="productId"
      @close_modal="modalIsShow = false"
    ></ModalSale>
    <button class="btn" @click="handleSaleModal()">Sell</button>
    <el-table :data="sales" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <ul>
            <li>
              date_shipped:
              {{ new Date(props.row.date_shipped).toUTCString() }}
            </li>
            <li>product price: {{ props.row.product.price }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Number Sales" prop="product.number_shipments" />
      <el-table-column label="ID" prop="product.id" />
      <el-table-column label="Product Name" prop="product.name" />
    </el-table>
  </div>
</template>
<script>
import ModalSale from "./ModalSale.vue";
import { ElTable, ElTableColumn } from "element-plus";
import { mapState } from "vuex";

export default {
  name: "TableSales",
  components: { ElTable, ElTableColumn, ModalSale },
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
  computed: {
    ...mapState("sales", ["sales"]),
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("sales/getSalesByProduct", this.productId);
  },
  methods: {
    handleSaleModal() {
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
