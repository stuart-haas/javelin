<template>
  <div class="mt-4 w-10/12 m-auto">
    <div class="pt-4 pb-8">
      <h1 class="text-4xl">Favorites</h1>
    </div>
    <div v-for="product in products" :key="product._id" class="py-2">
      <router-link :to="`/products/${product._id}`" class="underline">{{
        product.name
      }}</router-link>
    </div>
    <div v-if="!products.length">You don't have any favoirtes yet</div>
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
