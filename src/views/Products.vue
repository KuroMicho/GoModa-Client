<template>
  <div>
    <Navbar />
    <AlertCustom
      v-bind:alertIsShow="alertIsShow"
      :msg="'Sucess Deleted'"
      :type="'success'"
      @close_alert="alertIsShow = false"
    />
    <ModalAdd
      v-bind:modalIsShow="modalIsShow"
      @close_modal="modalIsShow = false"
    />
    <button
      v-show="!user.is_vendor && user.is__admin"
      class="btn"
      @click="handleAddModal()"
    >
      Add Product
    </button>
    <el-table
      :data="
        products.filter(
          (product) =>
            !search || product.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 80%; margin: 0 auto"
    >
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Price" prop="price" />
      <el-table-column label="Image">
        <template #default="scope">
          <img
            class="product-img"
            :src="scope.row.image"
            :alt="scope.row.description"
          />
        </template>
      </el-table-column>
      <el-table-column label="Date Created" width="230">
        <template #default="scope">
          {{ new Date(scope.row.date_created).toUTCString() }}
        </template>
      </el-table-column>
      <el-table-column label="Minimum" prop="minimum_required" />
      <el-table-column label="On Hand" prop="inventory_onhand" />
      <el-table-column align="right" width="180">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template #default="scope">
          <div class="btn-actions" v-show="!user.is_vendor && user.is__admin">
            <el-button
              size="mini"
              @click="this.$router.push(`/product/${scope.row.id}`)"
            >
              Editar
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >Delete</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <h3 style="text-align: center">Actions</h3>
        </template>
        <template #default="scope">
          <div class="btn-actions">
            <el-button
              size="mini"
              type="success"
              @click="this.$router.push(`/product/${scope.row.id}/sales/`)"
            >
              Sales
            </el-button>
            <el-button
              size="mini"
              type="info"
              v-show="!user.is_vendor && user.is__admin"
              @click="this.$router.push(`/product/${scope.row.id}/purchases/`)"
            >
              Purchases
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <h3 style="margin-top: 80px">Grafica: Precio x Producto</h3>
    <line-chart
      :library="{ backgroundColor: '#222' }"
      ytitle="Price"
      label="Price"
      :data="
        products
          .map((product) => {
            return { [product.id]: product.price };
          })
          .reduce(function (result, item) {
            var key = Object.keys(item)[0]; //first propertys
            result[key] = item[key];
            return result;
          }, {})
      "
    ></line-chart>
    <Error v-if="error" :error="error"></Error>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Navbar from "@/components/Navbar.vue";
import ModalAdd from "../components/ModalAdd.vue";
import AlertCustom from "../components/AlertCustom.vue";
import { ElTable, ElTableColumn, ElButton, ElInput } from "element-plus";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/input/style/css";
import Error from "../components/Error.vue";

export default {
  name: "Products",
  data() {
    return {
      loading: false,
      modalIsShow: false,
      alertIsShow: false,
      search: "",
      error: "",
    };
  },
  components: {
    Navbar,
    ModalAdd,
    AlertCustom,
    ElTable,
    ElTableColumn,
    ElButton,
    ElInput,
    Error,
  },
  computed: {
    ...mapState("products", ["products"]),
    user() {
      return this.$store.state.auth?.user
        ? this.$store.state.auth.user.user
        : 0;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal;
      },
    },
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch("products/getProducts").then(
      (res) => {
        console.info(res);
      },
      (error) => {
        this.error = error.message;
      }
    );
  },
  methods: {
    async handleDelete(id) {
      this.$store
        .dispatch("products/deleteProduct", id)
        .then(() => (this.alertIsShow = true));
    },
    handleAddModal() {
      this.modalIsShow = true;
    },
  },
  emits: ["close_alert"],
};
</script>
<style scoped>
.product-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.btn-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-button {
  margin: 0;
}

.btn-actions > button:not(button:last-of-type) {
  margin-bottom: 5px;
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
