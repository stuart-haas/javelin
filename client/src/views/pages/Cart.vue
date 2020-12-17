<template>
  <div class="mt-4 w-10/12 m-auto">
    <div class="pt-4 pb-8">
      <h1 class="text-4xl">Cart</h1>
    </div>
    <div v-if="cartItems.length">
      <div v-for="product in products" :key="product._id" class="py-2">
        <div class="flex item-center justify-between">
          <span class="flex items-center justify-between">
            <router-link :to="`/products/${product._id}`" class="underline">{{
              product.name
            }}</router-link>
            <div class="ml-2 relative h-6 w-6 bg-green-500 rounded-full">
              <span
                class="text-white text-sm absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                >{{ product.quantity }}</span
              >
            </div>
          </span>
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
  },
};
</script>
