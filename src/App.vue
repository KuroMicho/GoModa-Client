<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
*,
*::before,
*::after {
  box-sizing: inherit;
  padding: 0;
  margin: 0;
}
:root {
  --pixel: 250px;
}

html {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
