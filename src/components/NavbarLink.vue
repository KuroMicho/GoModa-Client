<template>
  <div>
    <div v-if="user">
      <div class="user__staff" v-if="user.is_staff && user.is_vendor">
        <ul v-for="route in staffRoutes" :key="route.path">
          <li v-if="route.name !== 'Logout'">
            <router-link :to="route.path">
              <i :class="route.icon" />
              {{ route.name }}</router-link
            >
          </li>
          <li v-else>
            <span @click="handleLogout()">
              <i :class="route.icon" />
              {{ route.name }}</span
            >
          </li>
        </ul>
      </div>
      <div class="user__vendor" v-if="user.is_vendor && !user.is_staff">
        <ul v-for="route in vendorRoutes" :key="route.path">
          <li v-if="route.name !== 'Logout'">
            <router-link :to="route.path">
              <i :class="route.icon" />
              {{ route.name }}</router-link
            >
          </li>
          <li v-else>
            <span @click="handleLogout()">
              <i :class="route.icon" />
              {{ route.name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <ul class="user__not" v-else>
      <li v-for="route in publicRoutes" :key="route.path">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "NavbarLink",
  computed: {
    // a computed getter
    user() {
      return 0;
    },
  },
  props: {
    staffRoutes: {
      type: Array,
    },
    vendorRoutes: {
      type: Array,
    },
    publicRoutes: {
      type: Array,
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.user__staff,
.user__vendor {
  display: flex;
}

.navbar ul:not(ul:last-of-type) {
  margin-right: 20px;
}

.navbar ul {
  list-style: none;
}

.user__not {
  display: flex;
}

.user__not > li:not(li:last-of-type) {
  margin-right: 20px;
}

.navbar ul li a {
  color: #333;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}

span {
  cursor: pointer;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
