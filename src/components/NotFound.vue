<template>
  <div class="container">
    <h2>404</h2>
    <h3>There's nothing here</h3>
    <router-link to="/">Come Back Home</router-link>
  </div>
</template>
<script></script>
<style scoped>
.container {
  background-color: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container > h2 {
  font-size: 200px;
  font-family: "Muli", sans-serif;
  color: white;
}

.container > h3 {
  color: white;
  font-family: "Muli", sans-serif;
  font-size: 40px;
}

.container > a {
  margin-top: 100px;
  color: rebeccapurple;
  font-size: 50px;
  cursor: pointer;
}

@media only screen and (max-width: 900px) {
  .container > h2 {
    font-size: 100px;
  }

  .container > a {
    font-size: 25px;
  }
}
</style>
