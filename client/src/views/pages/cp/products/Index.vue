<template>
  <Content title="Products">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/products/new"
        >New Product</Button
      >
    </template>
    <Panel>
      <Table :data="data" :fields="fields" />
    </Panel>
  </Content>
</template>

<script>
import { format } from 'date-fns';

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
        {
          label: 'Last Updated',
          key: 'updatedAt',
          filter: 'date',
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
