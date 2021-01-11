<template>
  <Content title="Orders">
    <template #header>
      <div class="flex items-center">
        <Dropdown :items="items" />
      </div>
    </template>
    <Panel>
      <Table
        ref="table"
        :data="data"
        :fields="fields"
        :actions="actions"
        :options="{ orderBy: 'createdAt', sort: 'asc' }"
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
          label: 'Date',
          name: 'createdAt',
          concat: {
            names: ['createdAt', 'createdAt'],
            filters: ['date', 'time'],
            join: ' at ',
          },
        },
        {
          label: 'Order Id',
          name: 'orderId',
          tag: 'router-link',
          param: '_id',
          attrs: {
            class: 'text-secondary-500',
            to: '/cp/orders/:param',
          },
        },
        {
          label: 'Customer',
          name: 'customer',
          concat: {
            names: ['user.firstName', 'user.lastName'],
            join: ' ',
          },
        },
        {
          label: 'Status',
          name: 'status',
        },
        {
          label: 'Total',
          name: 'total',
          type: 'number',
          format: {
            filter: 'currency',
          },
        },
      ],
      items: [
        {
          label: 'New Order',
          icon: 'plus',
          tag: 'router-link',
          to: '/cp/orders/new',
        },
      ],
      actions: [
        {
          label: 'Archive Selected',
          action: ({ data }) => {
            const ids = data.selectedData;
            this.handleBatchAction({
              action: 'status',
              formData: { ids, status: 'archived' },
            });
          },
        },
        {
          label: 'Cancel Selected',
          action: ({ data }) => {
            const ids = data.selectedData;
            this.handleBatchAction({
              action: 'status',
              formData: { ids, status: 'canceled' },
            });
          },
        },
      ],
    };
  },
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
    data() {
      return this.mapTable(this.orders, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$store.dispatch('order/fetch');
    },
    async handleBatchAction(data) {
      const message = await this.$store.dispatch('confirmable', {
        api: 'order/batch',
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
