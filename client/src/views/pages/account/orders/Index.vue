<template>
  <Content title="Your Orders">
    <Panel>
      <Table :data="data" :fields="fields" v-if="data.length" />
      <div v-else>You haven't placed any orders.</div>
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
      const param = this.$store.state.user.user._id;
      const orders = await this.$store.dispatch('get', { api: 'order', param });
      if (orders) {
        this.orders = orders;
      }
    },
  },
};
</script>
