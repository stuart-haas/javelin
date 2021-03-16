<template>
  <figure class="image is-32x32">
    <img class="is-rounded" :src="src" />
  </figure>
</template>

<script>
export default {
  props: {
    src: String,
  },
};
</script>

<style scoped>
.Avatar {
  width: 40px;
  height: 40px;
}
.Avatar img {
  max-width: 100%;
  height: auto;
  border-radius: 100%;
  vertical-align: middle;
}
</style>
