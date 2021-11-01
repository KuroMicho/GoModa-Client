<template>
  <div class="container">
    <Navbar /><el-table
      :data="
        users.filter(
          (user) =>
            !search ||
            user.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 80%; margin: 0 auto"
    >
      <el-table-column label="Username" prop="username" />
      <el-table-column label="Email" prop="email" />
      <el-table-column label="Vendor">
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_vendor"
            @change="
              handleSwitchRole({
                id: scope.row.id,
                is_vendor: scope.row.is_vendor,
              })
            "
            active-color="#13ce66"
            inactive-color="#ff4949"
          />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
      </el-table-column>
    </el-table>
    <span v-if="msg">{{ msg }}</span>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Navbar from "@/components/Navbar.vue";
import { ElTable, ElTableColumn, ElInput, ElSwitch } from "element-plus";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/input/style/css";
import "element-plus/es/components/switch/style/css";

export default {
  name: "Users",
  data() {
    return {
      msg: "",
      search: "",
      loading: false,
      showModal: false,
    };
  },
  computed: {
    ...mapState("users", ["users"]),
  },
  components: { Navbar, ElTable, ElTableColumn, ElInput, ElSwitch },
  mounted() {
    this.loading = true;
    this.$store.dispatch("users/getUsers");
  },
  methods: {
    handleSwitchRole({ id, is_vendor: vendor }) {
      const user = this.users.filter((user) => user.id == id)[0];
      const userUpdated = { is_vendor: vendor, ...user };
      this.$store
        .dispatch("users/putUser", { id, data: userUpdated })
        .then(() => {
          alert("user updated");
        })
        .catch((error) => {
          this.msg = `${error} something went wrong`;
        });
    },
  },
};
</script>
<style scoped>
.container table {
  background-color: rgba(98, 59, 134, 0.459);
  padding: 10px 5px;
}

.container table th {
  background-color: rgba(102, 189, 160, 0.486);
  padding: 0px 20px;
}

.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: 50%;
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
