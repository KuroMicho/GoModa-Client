<template>
  <footer class="footer">
    <div class="footer__header">
      <img src="../assets/main_img.png" alt="logo gomoda" />
    </div>
    <div class="footer__body">
      <div>
        <p>Store managment inventory for clothing store.</p>
      </div>
      <div>
        <h5>Links</h5>
        <ul>
          <li>
            <i class="fab fa-vuejs"></i>
            <a href="https://cli.vuejs.org">Vue</a>
          </li>
          <li>
            <i class="fab fa-github"></i>
            <a href="https://bitbucket.org/juandevU/gomodago_fd/src">Github</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__copy">
      <h6>© 2021 MISION TIC P22-5</h6>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  padding: 20px 0;
  background-color: rgba(240, 128, 128, 0.4);
}

.footer__header > img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.footer__body {
  display: flex;
  justify-content: space-around;
}

.footer__body * ul {
  list-style: none;
  display: flex;
  margin-top: 20px;
}

.footer__body * li:not(li:last-of-type) {
  margin-right: 20px;
}

.footer__body * i {
  margin-right: 10px;
}

.footer__body * a {
  text-decoration: none;
  color: gray;
}
</style>
