<template>
  <div class="navbar">
    <router-link to="/">
      <img src="../assets/main_img.png" alt="ecommerce gomoda" />
    </router-link>
    <NavbarLink
      :staffRoutes="staffRoutes"
      :vendorRoutes="vendorRoutes"
      :publicRoutes="publicRoutes"
    />
  </div>
</template>
<script>
import NavbarLink from "./NavbarLink.vue";
export default {
  name: "Navbar",
  data() {
    return {
      staffRoutes: [
        {
          path: "/users",
          name: "Users",
          icon: "fas fa-users",
        },
        {
          path: "/products",
          name: "Products",
          icon: "fas fa-tshirt",
        },
        {
          path: "/sales",
          name: "Sales",
          icon: "fas fa-shopping-cart",
        },
        {
          path: "/suppliers",
          name: "Suppliers",
          icon: "fas fa-people-carry",
        },
        {
          path: "/purchases",
          name: "Purchases",
          icon: "fas fa-store-alt",
        },
        {
          name: "Logout",
          icon: "fas fa-sign-out-alt",
        },
      ],
      vendorRoutes: [
        {
          path: "/products",
          name: "Products",
          icon: "fas fa-tshirt",
        },
        {
          name: "Logout",
          icon: "fas fa-sign-out-alt",
        },
      ],
      publicRoutes: [
        {
          path: "/login",
          name: "Login",
        },
        {
          path: "/register",
          name: "Register",
        },
      ],
    };
  },
  components: {
    NavbarLink,
  },
};
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 200px;
  background-image: linear-gradient(
    to left,
    rgba(185, 118, 194, 0.5) 0%,
    rgba(201, 79, 120, 0.459) 40%,
    rgba(200, 123, 140, 0.2)
  );
}

.navbar img {
  width: 80px;
  height: 50px;
  object-fit: cover;
}
</style>
