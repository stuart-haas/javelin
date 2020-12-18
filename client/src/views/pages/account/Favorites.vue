<template>
  <div class="w-full">
    <h1 class="text-4xl">Favorites</h1>
    <div class="mt-6 space-y-2">
      <div v-for="product in favorites" :key="product._id">
        <router-link :to="`/products/${product._id}`" class="underline">{{
          product.name
        }}</router-link
        ><Icon
          icon="times"
          class="ml-2 cursor-pointer"
          @click="removeFavorite(product._id)"
        />
      </div>
      <div v-if="!favorites.length">You don't have any favoirtes yet.</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorites() {
      return this.$store.state.user.favorites;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.$store.dispatch('user/favorites');
    },
    async removeFavorite(favorite) {
      const param = this.$store.state.user.user._id;
      const formData = { favorite };
      await this.$store.dispatch('user/removeFavorite', { param, formData });
    },
  },
};
</script>
