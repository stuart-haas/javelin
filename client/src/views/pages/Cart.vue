<template>
  <div class="mt-4 w-10/12 m-auto">
    <div class="pt-4 pb-8">
      <h1 class="text-4xl">Cart</h1>
    </div>
    <div v-if="cartItems.length">
      <div v-for="product in products" :key="product._id" class="py-2">
        <div class="flex item-center justify-between">
          <router-link :to="`/products/${product._id}`" class="underline"
            >{{ product.name }} - {{ getQuantity(product._id) }}</router-link
          >
          <button
            class="shadow-lg rounded p-2 bg-orange-dark text-white hover:bg-orange-darker transition duration-200 ease-in-out"
            @click="removeFromCart({ id: product._id })"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
    <div v-if="!cartItems.length">
      Your cart is empty.
      <router-link class="underline" to="/products">Shop now.</router-link>
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
  computed: {
    cartItems() {
      return this.$store.state.cart.cart.items;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const products = await this.$store.dispatch('get', {
        api: 'cart/merge',
      });
      this.products = products;
    },
    async removeFromCart(formData) {
      await this.$store.dispatch('cart/remove', { formData });
    },
    getQuantity(id) {
      const item = this.findItemById(id);
      return item.quantity;
    },
    findItemById(id) {
      const item = this.$store.state.cart.cart.items.find((item) => {
        return String(item.id) === String(id);
      });
      return item;
    },
  },
};
</script>
