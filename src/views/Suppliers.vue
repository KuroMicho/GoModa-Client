<template>
  <div>
    <Navbar />
    <ModalSupplier
      v-bind:modalIsShow="modalIsShow"
      @close_modal="modalIsShow = false"
    />
    <button class="btn" @click="handleSupplierModal()">Add Supplier</button>
    <el-table
      :data="
        suppliers.filter(
          (supplier) =>
            !search ||
            supplier.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 80%; margin: 0 auto"
    >
      <el-table-column label="Name" prop="name" />
      <el-table-column label="City" prop="city" />
      <el-table-column label="Address" prop="address" />
      <el-table-column label="Phone" prop="phone" />
      <el-table-column align="right" width="180">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
      </el-table-column>
    </el-table>
    <Error v-if="error" :error="error"></Error>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Navbar from "@/components/Navbar.vue";
import ModalSupplier from "../components/ModalSupplier.vue";
import { ElTable, ElTableColumn, ElInput } from "element-plus";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/input/style/css";
import Error from "../components/Error.vue";

export default {
  name: "Suppliers",
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
    ModalSupplier,
    ElTable,
    ElTableColumn,
    ElInput,
    Error,
  },
  computed: { ...mapState("suppliers", ["suppliers"]) },
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
    this.$store.dispatch("suppliers/getSuppliers").then(
      (res) => {
        console.info(res);
      },
      (error) => {
        this.error = error.message;
      }
    );
  },
  methods: {
    handleSupplierModal() {
      this.modalIsShow = true;
    },
  },
  emits: ["close_modal"],
};
</script>
<style scoped>
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
