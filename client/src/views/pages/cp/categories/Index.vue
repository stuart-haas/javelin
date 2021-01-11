<template>
  <Content title="Categories">
    <template #header>
      <Button theme="secondary" tag="router-link" to="/cp/categories/new"
        >New Category</Button
      >
    </template>
    <Panel>
      <Table
        ref="table"
        :data="data"
        :fields="fields"
        :actions="actions"
        :options="{ orderBy: 'name', sort: 'desc' }"
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
          label: 'Name',
          name: 'name',
          tag: 'router-link',
          param: '_id',
          attrs: {
            class: 'text-secondary-500',
            to: '/cp/categories/:param',
          },
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
    categories() {
      return this.$store.state.category.categories;
    },
    data() {
      return this.mapTable(this.categories, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch('category/fetch');
    },
    async handleBatchAction(data) {
      const message = await this.$store.dispatch('confirmable', {
        api: 'category/batch',
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
