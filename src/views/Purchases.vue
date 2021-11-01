<template>
  <div>
    <Navbar />
    <TablePurchases :productId="id" />
  </div>
</template>
<script>
import TablePurchases from "../components/TablePurchases.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Purchases",
  data() {
    return {
      loading: false,
    };
  },
  props: ["id"],
  components: { Navbar, TablePurchases },
};
</script>
<style scoped></style>
