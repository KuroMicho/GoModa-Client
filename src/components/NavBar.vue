
<template>
  <nav>
    <div class="navbar">
      <router-link to="/">
        <img src="../assets/gg.png" alt="ecommerce gomoda" />
      </router-link>
      
      <ul>
          <!--
          <li><router-link v-show="!user" to="/login">LOGIN</router-link></li>
          <li><router-link v-show="!user" to="/register">REGISTER</router-link></li>
           -->
          <li><router-link v-if="user.is_vendor || user.is_staff" to="/" >Home</router-link></li>
          <li><router-link v-if="user.is_vendor || user.is_staff" to="/about" >About</router-link></li>
          <li><router-link v-if="user.is_vendor || user.is_staff" to="/products-onhands" >Products</router-link></li>
          <!--
          <li><router-link v-if="user.is_vendor || user.is_staff" to="/products" >Purchase Order </router-link></li>
          <li><router-link v-if="user.is_staff" to="/sales">Sales Order</router-link></li>
          <li><router-link v-if="user.is_vendor || user.is_staff" to="/products" >Suppliers</router-link></li>
       
          <li><router-link v-if="user.is_staff" to="/users">Users</router-link></li>
          <li><router-link v-if="user" to="/user">Profile</router-link></li>
          -->
          <li><a v-if="user" href="#" @click="handleLogout">LOGOUT</a></li>
      </ul>
      
    </div> 
    
   </nav>     
 </template>

  <script>
export default {
    name: 'NavBar' ,
    data() {
      return {         
        user: {
          is_staff: true,
          is_vendor: true,
        },
      };
    },    
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 200px;
  background-color: #473fa7;
}
.navbar img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
.navbar ul {
  list-style: none;
}
.navbar ul li  {
  color: #eeeded;
  background: #473fa7;
  border-radius: 5px;
  padding: 1px 1px;

}

.navbar ul li:hover{
  color: #2f1781;
  background: #eeeded;
  border: 0.5px solid #e8cd34;

}


</style>