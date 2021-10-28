<template>
        <footer class="page-footer z-depth-1">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="blue-grey-text text-darken-4">gomodago</h5>
                <p class="blue-grey-text text-darken-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="blue-grey-text text-darken-4">Links</h5>
                <ul>  
                  <li><a class="blue-grey-text text-darken-4 " href="https://cli.vuejs.org">Vue</a></li>
                  <li><a class="blue-grey-text text-darken-4 " href="https://materializecss.com/">Materialize</a></li>                 
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container white-text">
            <h6>© 2021 MISION TIC P22-5</h6>
            </div>
          </div>
        </footer>
</template>

<script>
export default {
    name: 'Footer'

}
</script>

<style scoped>
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }

  .page-footer{
    background: #80DDD9;
    bottom: 0;
  }
  .footer-copyright{
    bottom: 0;
    background: #7cddd8;
  }

</style>
