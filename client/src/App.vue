<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetchCart();
    this.fetchUser();
  },
  methods: {
    fetchCart() {
      this.$store.dispatch('cart/get');
    },
    async fetchUser() {
      const { user } = await this.$store.dispatch('get', {
        api: 'user/session',
      });

      if (user) {
        this.$store.commit('user/setState', { name: 'user', value: user });
      }
    },
  },
};
</script>
