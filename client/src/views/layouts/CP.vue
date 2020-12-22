<template>
  <div class="mb-20">
    <Header />
    <router-view />
    <Toast />
  </div>
</template>

<script>
import Header from '@/components/cp/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>
