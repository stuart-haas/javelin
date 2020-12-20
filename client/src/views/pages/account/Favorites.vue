<template>
  <div class="w-full">
    <h2 class="h2">Favorites</h2>
    <div class="mt-6 space-y-3">
      <div
        v-for="product in favorites"
        :key="product._id"
        class="flex items-center"
      >
        <router-link
          :to="`/products/${product._id}`"
          class="text-blue-500 mr-3"
          >{{ product.name }}</router-link
        >
        <div
          class="w-4 h-4 bg-gray-400 rounded-full p-3 text-center text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out"
          @click="removeFavorite(product._id)"
        >
          <Icon icon="times" />
        </div>
      </div>
      <div v-if="!favorites.length">You don't have any favorites.</div>
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
