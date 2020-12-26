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
export default {
  data() {
    return {
      products: [],
      fields: [
        {
          label: 'Name',
          name: 'name',
          tag: 'router-link',
          param: '_id',
          attrs: {
            class: 'text-secondary-500',
            to: '/cp/products/:param',
          },
        },
        {
          label: 'Category',
          name: 'category.name',
        },
        {
          label: 'Price',
          name: 'price',
        },
        {
          label: 'Inventory',
          name: 'inventory',
        },
        {
          label: 'Last Updated',
          name: 'updatedAt',
          format: {
            filter: 'date',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTable(this.products, this.fields);
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
