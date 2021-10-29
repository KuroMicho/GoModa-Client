<template>
  <div id="app">
    <div class="common-layout">    
      <el-container>
        <el-header>Header
                        
        </el-header>
        <el-container>
          <el-aside width="20%">Aside

          </el-aside>
          <el-container>
            <el-main>
                  <router-view/>
            </el-main>
            <el-footer>Footer

            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div> 
  </div>
</template>


<style scoped>
.el-header {
  background-color: #2f1781;
  color: #eeeded;
  text-align: center;
  line-height: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-footer {
  background-color: #80dcd8;
  color: #161B1B;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #473fa7;
  color: #e8cd34;
  text-align: center;
  line-height: 650px;
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



