<template>
  <h2>{{ error }}</h2>
</template>
<script>
export default {
  name: "Error",
  props: {
    error: {
      type: String,
    },
  },
};
</script>
<style scoped></style>
