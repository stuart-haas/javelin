<template>
  <Content title="Products">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/products/new"
        >New Product</Button
      >
    </template>
    <Panel>
      <Table
        ref="table"
        :data="data"
        :fields="fields"
        :actions="actions"
        :options="{ orderBy: 'name', sort: 'desc', perPage: 25 }"
        @refresh="fetch"
      />
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
      actions: [
        {
          label: 'Delete Selected',
          action: ({ data }) => {
            const { selectedData } = data;
            this.handleDeleteMany(selectedData);
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
    async handleDeleteMany(selectedData) {
      if (!window.confirm('Are you sure?')) return;
      const ids = selectedData;
      const formData = { ids };
      const { success, message } = await this.$store.dispatch('post', {
        api: 'product/bulk/delete',
        formData,
      });
      if (success) {
        this.fetch();
        this.$toast({ type: 'success', message, duration: 2000 });
        this.$refs.table.resetBulkAction();
      }
    },
  },
};
</script>
