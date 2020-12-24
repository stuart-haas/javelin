<template>
  <Content title="Orders">
    <template v-slot:header>
      <div class="flex items-center">
        <Button theme="danger" class="mr-3" @click="deleteAll"
          >Delete All</Button
        >
        <Button theme="secondary" tag="router-link" to="/cp/orders/new"
          >New Order</Button
        >
      </div>
    </template>
    <Panel>
      <Table :data="data" :fields="fields" v-if="data.length" />
      <div v-else>There aren't any orders.</div>
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
          concat: {
            keys: ['createdAt', 'createdAt'],
            filters: ['date', 'time'],
            join: ' at ',
          },
        },
        {
          label: 'Order Id',
          key: 'orderId',
          tag: 'router-link',
          attrs: {
            class: 'text-blue-500',
            to: '/cp/orders/:param',
            param: '_id',
          },
        },
        {
          label: 'Customer',
          concat: {
            keys: ['user.firstName', 'user.lastName'],
            join: ' ',
          },
        },
        {
          label: 'Status',
          key: 'status',
        },
        {
          label: 'Total',
          key: 'total',
          filter: 'currency',
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTableData(this.orders, this.fields);
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
    async deleteAll() {
      if (!window.confirm('Are you sure')) return;
      await this.$store.dispatch('delete', { api: 'order/cp' });
      this.orders = [];
      this.$toast({
        type: 'success',
        message: 'Orders deleted',
        duration: 2000,
      });
    },
  },
};
</script>
