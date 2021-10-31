<template>
  <div class="card">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    title: {
      type: Number,
    },
    content: {
      type: String,
    },
  },
};
</script>
<style scoped>
.card {
  width: var(--pixel);
  height: var(--pixel);
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: all 0.4s;
}
.card:hover {
  color: white;
}
.card::before,
.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(243, 243, 243);
  z-index: -1;
  border-radius: 10px;
  transition: all 0.4s;
}
.card::after {
  background: #f8485e;
  transform-origin: right bottom;
  transform: translate(10%, 10%) scale(0.3);
  border-radius: 50%;
}
.card:hover::after {
  transform: translate(0) scale(1);
  border-radius: 10px;
  border-bottom-right-radius: 40px;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
}
.card:hover::before {
  transform-origin: right bottom;
  transform: translate(10%, 10%) scale(0.3);
  border-radius: 50%;
  z-index: 1;
}
</style>
