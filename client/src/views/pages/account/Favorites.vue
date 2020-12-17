<template>
  <div class="w-full">
    <h1 class="text-4xl">Favorites</h1>
    <div class="mt-6">
      <div v-for="product in products" :key="product._id">
        <router-link :to="`/products/${product._id}`" class="underline">{{
          product.name
        }}</router-link>
      </div>
      <div v-if="!products.length">You don't have any favoirtes yet</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param =
        this.$store.state.user.user && this.$store.state.user.user._id;
      if (!param) return;
      const user = await this.$store.dispatch('get', {
        api: 'user',
        param,
      });
      this.products = user.favorites;
    },
  },
};
</script>
