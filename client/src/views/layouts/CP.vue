<template>
  <div class="Page">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '../../components/cp/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>
