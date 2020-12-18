<template>
  <div class="mt-4 w-10/12 m-auto">
    <div class="pt-4 pb-8">
      <h1 class="text-4xl">Cart</h1>
    </div>
    <div v-if="items.length">
      <div v-for="product in items" :key="product.id" class="py-2">
        <div class="flex item-center justify-between">
          <span class="flex items-center justify-between">
            <router-link :to="`/products/${product.id}`" class="underline">{{
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
            class="shadow-lg rounded p-2 bg-green-500 text-white hover:bg-green-600 transition duration-200 ease-in-out"
            @click="removeFromCart({ id: product.id })"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </div>
    <div v-if="!items.length">
      Your cart is empty.
      <router-link class="underline" to="/products">Shop now.</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
  },
  methods: {
    async removeFromCart(formData) {
      await this.$store.dispatch('cart/remove', { formData });
    },
  },
};
</script>
