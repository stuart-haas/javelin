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
      fields: [
        {
          label: 'Image',
          name: 'image',
          tag: 'img',
          attrs: {
            src: 'image',
            class: 'h-16 w-auto',
          },
        },
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
          label: 'Status',
          name: 'status',
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
          label: 'Set as active',
          action: ({ data }) => {
            const ids = data.selectedData;
            this.handleBatchAction({
              action: 'status',
              formData: { ids, status: 'active' },
            });
          },
        },
        {
          label: 'Set as draft',
          action: ({ data }) => {
            const ids = data.selectedData;
            this.handleBatchAction({
              action: 'status',
              formData: { ids, status: 'draft' },
            });
          },
        },
        {
          tag: 'hr',
        },
        {
          label: 'Delete Selected',
          action: ({ data }) => {
            const ids = data.selectedData;
            this.handleBatchAction({
              action: 'delete',
              formData: { ids, status: 'draft' },
            });
          },
        },
      ],
    };
  },
  computed: {
    products() {
      return this.$store.state.product.products;
    },
    data() {
      return this.mapTable(this.products, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch('product/fetch');
    },
    async handleBatchAction(data) {
      const message = await this.$store.dispatch('confirmable', {
        api: 'product/batch',
        data,
      });
      if (message) {
        this.handleActionSuccess(message);
      }
    },
    handleActionSuccess(message) {
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$refs.table.resetBulkAction();
    },
  },
};
</script>
