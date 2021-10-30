<template>
  <div id="app">
    <div class="common-layout">    
      <el-container>
        <el-header>

          <NavBar/> 
             
        </el-header>
        <el-container>
          <el-aside width="20%">Aside

          </el-aside>
          <el-container>
            <el-main>
                  <router-view/>
            </el-main>
            <el-footer>®MISIONTIC 2022 UNAL P22-5

            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div> 
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'


export default {
  components: {
    NavBar,
  
  }
}
</script>

<style scoped>


.el-header {
  background-color: #473fa7;
  color: #eeeded;
  text-align: center;
  line-height: 60px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  padding: 2px;

}
.el-footer {
  background-color:  #2f1781;
  color: #eeeded;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color:  #80dcd8;
  color: #161B1B;
  text-align: center;
  line-height: 600px;
  padding: 20px;
}

.el-main {
  background-color: #eeeded;
  color: #161B1B;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>



