<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Products</h2>
      <Button theme="secondary" tag="router-link" to="/cp/products/new"
        >New Product</Button
      >
    </div>
    <table class="w-full table-auto text-left mt-6">
      <tr class="font-bold border-b border-gray-300">
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>
        <th>Inventory</th>
      </tr>
      <tr v-for="product in products" :key="product._id">
        <td>
          <router-link
            :to="`/cp/products/${product._id}`"
            class="text-blue-500"
            >{{ product.name }}</router-link
          >
        </td>
        <td>{{ product.category.name }}</td>
        <td>{{ product.formattedPrice }}</td>
        <td>{{ product.inventory }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const products = await this.$store.dispatch('get', { api: 'product' });
      if (products) {
        this.products = products;
      }
    },
  },
};
</script>

<style scoped>
th,
td {
  @apply p-3;
}
</style>
