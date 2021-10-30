<template>
  <div class="home">
    <Navbar />
    <Banner />
    <div class="card">
      <Card :title="1" :content="'Empty'" />
      <Card :title="2" :content="'Empty'" />
      <Card :title="3" :content="'Empty'" />
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import Footer from "@/components/Footer.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: { Navbar, Banner, Footer, Card },
};
</script>
<style scoped>
.card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
