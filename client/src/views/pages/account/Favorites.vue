<template>
  <Content title="Favorites">
    <transition-group name="slideDown">
      <div
        v-for="product in favorites"
        :key="product._id"
        class="slideDown flex items-center mb-6"
      >
        <router-link
          :to="`/products/${product._id}`"
          class="text-blue-500 mr-3"
          >{{ product.name }}</router-link
        >
        <CloseButton @click="removeFavorite(product._id)" />
      </div>
    </transition-group>
    <div v-if="!favorites.length">You don't have any favorites.</div>
  </Content>
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
