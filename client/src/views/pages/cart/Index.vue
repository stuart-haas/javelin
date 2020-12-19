<template>
  <div class="mt-4 w-10/12 m-auto">
    <div class="pt-4">
      <h1 class="h1">Cart</h1>
    </div>
    <div
      v-if="items.length"
      class="border-b border-gray-300 space-y-2 mt-8 pb-2"
    >
      <Item :product="product" v-for="product in items" :key="product.id" />
    </div>
    <div class="mt-6">
      <div v-if="!items.length">
        Your cart is empty.
        <router-link class="underline" to="/products">Shop now.</router-link>
      </div>
      <div v-else class="text-right">
        <p class="text-lg my-4">{{ formattedTotal }}</p>
        <router-link
          to="/cart/checkout"
          class="inline-block transition duration-200 p-3 text-white bg-blue-500 hover:bg-blue-600"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '../../../components/Item.vue';

export default {
  components: {
    Item,
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    formattedTotal() {
      return this.$store.state.cart.formattedTotal;
    },
  },
};
</script>
