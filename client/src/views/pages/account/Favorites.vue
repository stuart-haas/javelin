<template>
  <div class="w-full">
    <h1 class="text-4xl">Favorites</h1>
    <div class="mt-6 space-y-3">
      <div
        v-for="product in favorites"
        :key="product._id"
        class="flex items-center"
      >
        <div
          class="w-4 h-4 bg-red-500 rounded-full p-2.5 text-sm text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-200"
        >
          <Icon icon="times" @click="removeFavorite(product._id)" />
        </div>
        <router-link
          :to="`/products/${product._id}`"
          class="text-blue-500 hover:underline ml-3"
          >{{ product.name }}</router-link
        >
      </div>
      <div v-if="!favorites.length">You don't have any favoirtes yet.</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
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
