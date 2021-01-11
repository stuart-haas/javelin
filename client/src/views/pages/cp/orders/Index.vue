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
      orders: [],
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
      return this.mapTable(this.orders, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const orders = await this.$store.dispatch('get', { api: 'order/cp' });
      if (orders) {
        this.orders = orders;
      }
    },
    async handleDeleteMany(selectedData) {
      if (!window.confirm('Are you sure?')) return;
      const ids = selectedData;
      const formData = { ids };
      const { success, message } = await this.$store.dispatch('post', {
        api: 'order/bulk/delete',
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
