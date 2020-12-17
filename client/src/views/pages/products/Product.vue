<template>
  <div class="mt-10 w-10/12 m-auto">
    <h1 class="text-2xl">{{ product.name }}</h1>
    <div class="my-8">
      {{ product.description }}
    </div>
    <div class="mt-2">{{ product.formattedPrice }}</div>
    <div class="my-4">
      <button
        class="shadow-lg rounded transition duration-200 ease-in-out bg-orange-dark p-2 hover:bg-orange-darker text-white"
        @click="addToCart(product._id)"
      >
        Add to Cart
      </button>
    </div>
    <span
      v-if="user"
      class="inline-block mt-2 border-b border-black cursor-pointer"
      @click="toggleFavorite(product._id)"
      >{{
        this.getUserFavorite(product._id)
          ? 'Remove from Favorites'
          : 'Add to Favorites'
      }}</span
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      const product = await this.$store.dispatch('get', {
        api: 'product',
        param,
      });
      this.product = product;
    },
    async addToCart(id) {
      const quantity = this.getItemQuantity(id) + 1;
      const formData = { id, quantity };
      await this.$store.dispatch('cart/add', { formData });
    },
    async toggleFavorite(favorite) {
      const isFavorite = this.getUserFavorite(favorite);
      const param = this.$store.state.user.user._id;
      const formData = { favorite };
      if (!isFavorite) {
        await this.$store.dispatch('user/addFavorite', { param, formData });
      } else {
        await this.$store.dispatch('user/removeFavorite', { param, formData });
      }
    },
    getItemQuantity(id) {
      const item = this.$store.state.cart.cart.items.find((item) => {
        return item.id == id;
      });
      return item ? item.quantity : 0;
    },
    getUserFavorite(id) {
      const item = this.$store.state.user.user.favorites.find((item) => {
        return item == id;
      });
      return item ? true : false;
    },
  },
};
</script>
