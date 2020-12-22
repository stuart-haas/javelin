<template>
  <Content title="Products">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/products/new"
        >New Product</Button
      >
    </template>
    <Table :data="data" :fields="fields" />
  </Content>
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
          key: 'formattedPrice',
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
