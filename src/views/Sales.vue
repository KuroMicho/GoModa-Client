<template>
  <div>
    <Navbar />
    <TableSales :productId="id" />
  </div>
</template>
<script>
import TableSales from "../components/TableSales.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Sales",
  data() {
    return {
      loading: false,
    };
  },
  props: ["id"],
  components: { Navbar, TableSales },
};
</script>
<style scoped></style>
