<template>
  <v-app>
    <v-con>
      <!-- Navbar goes here -->
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/feature">Feature</router-link>
      </div>
    </v-con>
    <router-view/>
    <v-con>
      <Footer/>
    </v-con>
    


    <!-- Page Layout here -->
    <div class="row">

      <div class="col s3">
        <!-- Grey navigation panel -->
      </div>

      <div class="col s9">
        <!-- Teal page content  -->
      </div>

    </div>





  </v-app>  
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style scoped>
footer{
  clear: both;
  bottom: 0; 
}
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
