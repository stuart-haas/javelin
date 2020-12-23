<template>
  <Page>
    <template v-slot:content>
      <h1 class="h1">Cart</h1>
      <div
        v-if="items.length"
        class="border-b border-gray-300 space-y-2 mt-8 pb-2"
      >
        <Item :product="product" v-for="product in items" :key="product.id" />
      </div>
      <div class="mt-6">
        <div v-if="!items.length">
          Your cart is empty.
          <router-link class="link underline" to="/products"
            >Shop now.</router-link
          >
        </div>
        <div v-else class="text-right">
          <p class="text-lg my-4">{{ total }}</p>
          <Button
            class="inline-block mt-1"
            tag="router-link"
            theme="secondary"
            to="/cart/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </template>
  </Page>
</template>

<script>
import Item from '@/components/Item.vue';

export default {
  components: {
    Item,
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    total() {
      return this.$store.state.cart.total;
    },
  },
};
</script>
