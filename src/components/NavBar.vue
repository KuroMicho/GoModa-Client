<template>
    <div>
        <nav>
            <div class="nav-wrapper indigo darken-1">
                <a href="#" class="brand-logo left"></a>
                <img alt="GO logo" src="../assets/go.png" width="50" height="50">
               
                  <ul id="nav-mobile" class="right hide-on-med-and-down waves-effect waves-light btn-large indigo darken-1">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/feature">Products</router-link></li>
                    <li><router-link to="/feature">Purchase Order</router-link></li>
                    <li><router-link to="/feature">Sale Order</router-link></li>
                    <li><router-link to="/feature">Suppliers</router-link></li>
                    <!--<li><a href="badges.html">Components</a></li>-->
                    <li><a href="collapsible.html">SIGN IN</a></li>
                    <li><a href="collapsible.html">LOGIN</a></li>
                  </ul>
                
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'NavBar'

}
</script>

<style scoped>
    #nav-mobiles {
  color: white;
  padding: 15px 15px 15px 15px;
  text-align: center;
  /*display:-moz-deck;*/
  font-size: 14px;
  border-radius: 8px;
  transition-duration: 0.4s;
}

.button:hover {
  background-color: #4CAF50; /* Green */
  color: white;
}


  #nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>