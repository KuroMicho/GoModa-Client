<template>
  <v-app>

    <div class="header">
      <NavBar/>
    </div>

    <div class="aside">

    </div>

    <div class="field">
      <router-view/> 
    </div>

    <div class="footer">
       <Footer/>
    </div>

  </v-app>  
</template>

<script>

import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    NavBar,
    Footer,
  }
}
</script>

<style scoped>

header {
  grid-column: 1 / 12;
  grid-row: 1;
}

field {
  grid-column: 4 / 12;
  grid-row: 2;
}

aside {
  grid-column: 1 / 4;
  grid-row: 2;
  background:aqua;
}

footer {
  grid-column: 1 / 12;
  grid-row: 3;
  bottom: 0;
}
</style>

