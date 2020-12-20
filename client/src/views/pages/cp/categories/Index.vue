<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Categories</h2>
      <Button theme="secondary" tag="router-link" to="/cp/categories/new"
        >New Category</Button
      >
    </div>
    <table class="w-full table-auto text-left mt-6">
      <tr class="font-bold border-b border-gray-300">
        <th>Name</th>
      </tr>
      <tr v-for="category in categories" :key="category._id">
        <td>
          <router-link
            :to="`/cp/categories/${category._id}`"
            class="text-blue-500"
            >{{ category.name }}</router-link
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const categories = await this.$store.dispatch('get', { api: 'category' });
      if (categories) {
        this.categories = categories;
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
