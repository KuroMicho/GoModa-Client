<template>
  <div class="tag" v-if="typeof item === 'object' && item">
    <el-tag
      closable
      v-for="(item, index) in item"
      :key="index"
      @close="handleClose(index)"
      >{{ item }}</el-tag
    >
  </div>
</template>
<script>
import { ElTag } from "element-plus";
import "element-plus/es/components/tag/style/css";

export default {
  name: "Tag",
  props: {
    item: {
      type: Object,
    },
  },
  components: { ElTag },
  methods: {
    handleClose(index) {
      const data = {
        item: delete this.item[index] ? { ...this.item } : false,
      };
      this.$emit("pop_item", data);
    },
  },
};
</script>
<style scoped>
.tag {
  padding: 5px 0;
}

.tag > span:not(span:last-of-type) {
  margin-right: 5px;
}
</style>
