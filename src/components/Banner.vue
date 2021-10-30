<template>
  <div class="banner">
    <div class="banner__composition">
      <figure class="banner__figure banner__figure--1">
        <img
          src="https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=467&q=80"
          alt="none"
        />
      </figure>
      <figure class="banner__figure banner__figure--2">
        <img
          src="https://images.unsplash.com/photo-1500646146968-c3212d1af409?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80"
        />
      </figure>
      <figure class="banner__figure banner__figure--3">
        <img
          src="https://images.unsplash.com/photo-1509205206130-24819154d9e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </figure>
    </div>
    <div class="banner__header">
      <h1 class="banner__title">GOMODA</h1>
      <h2 class="banner__sub">The Woman Style of A New Generation</h2>
    </div>
    <div class="banner__footer">
      <h3>Join us, be part of our team</h3>
      <router-link to="register">
        <button>Click Me</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.banner {
  background-color: rgba(186, 146, 202, 0.514);
  display: flex;
  justify-content: center;
  flex-direction: column;
  clip-path: polygon(90% 100%, 0% 100%, 10% 0%, 100% 0);
  /* height: 100%; */
}

.banner__composition {
  width: 90%;
  margin: 0 auto;
  display: flex;
  position: relative;
  height: 200px;
}

.banner__composition > figure:hover {
  filter: initial;
}

.banner__composition:hover > figure:not(figure:hover) {
  filter: grayscale(100%);
}

.banner__figure {
  width: 40%;
  height: 100%;
  cursor: pointer;
}

.banner__figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner__figure--1 {
  position: absolute;
  z-index: 10;
  left: 0;
  padding: 20px 30px;
  transition: all 0.2s;
}

.banner__figure--1:hover {
  padding: 10px 15px;
  z-index: 1000;
}

.banner__figure--2 {
  position: absolute;
  z-index: 30;
  left: 50%;
  padding: 5px;
  transform: translateX(-50%);
  transition: all 0.2s;
}

.banner__figure--2:hover {
  padding: 0;
  z-index: 1000;
}

.banner__figure--3 {
  position: absolute;
  z-index: 10;
  right: 0;
  padding: 20px 30px;
  transition: all 0.2s;
}

.banner__figure--3:hover {
  padding: 10px 15px;
  z-index: 1000;
}

.banner__figure--3 > img {
  object-position: 50% 20%;
}

.banner__header {
  margin-top: 25px;
}

.banner__title {
  display: inline-block;
  letter-spacing: 5px;
  background: linear-gradient(to left, rgb(116, 58, 170), #e02020d7);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.banner__sub {
  letter-spacing: 10px;
  word-spacing: 5px;
  margin-top: 5px;
}

.banner__footer {
  display: flex;
  align-items: center;
  margin-top: 40px;
  justify-content: center;
  background-color: rgba(221, 138, 216, 0.712);
  padding: 10px 0px;
}

.banner__footer * button {
  margin-left: 50px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: rgba(173, 65, 216, 0.514);
  color: rgb(44, 7, 112);
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 2px 1px 0.4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.2s;
}

.banner__footer * button:hover {
  box-shadow: 0px 2px 0.5px 0.2px rgba(0, 0, 0, 0.3);
}
</style>
