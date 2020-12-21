<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Products</h2>
      <Button theme="secondary" tag="router-link" to="/cp/products/new"
        >New Product</Button
      >
    </div>
    <Table :data="data" :fields="fields" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      fields: [
        {
          label: 'Name',
          key: 'name',
          tag: 'router-link',
          attrs: {
            class: 'text-blue-500',
            to: '/cp/products/:param',
            param: '_id',
          },
        },
        {
          label: 'Category',
          key: 'category.name',
        },
        {
          label: 'Price',
          key: 'price',
        },
        {
          label: 'Inventory',
          key: 'inventory',
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTableData(this.products, this.fields);
    },
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
