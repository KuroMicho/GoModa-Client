<template>
  <div class="alert">
    <el-alert
      v-show="alertIsShow"
      :title="msg"
      :type="type"
      effect="dark"
      show-icon
    ></el-alert>
  </div>
</template>
<script>
import { ElAlert } from "element-plus";
import "element-plus/es/components/alert/style/css";
export default {
  name: "AlertCustom",
  props: {
    alertIsShow: {
      type: Boolean,
    },
    msg: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  updated() {
    this.$nextTick(function() {
      if (this.alertIsShow == true) {
        this.handleAlertClose();
      }
    });
  },
  components: { ElAlert },
  methods: {
    handleAlertClose() {
      setTimeout(() => this.$emit("close_alert"), 2000);
    },
  },
};
</script>
<style scoped>
.alert {
  height: 35px;
  width: 90%;
  margin: 5px auto;
}
</style>
