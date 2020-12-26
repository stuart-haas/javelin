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
          filter: 'dateTime',
        },
        {
          label: 'Order Id',
          name: 'orderId',
        },
        {
          value: 'View',
          tag: 'router-link',
          class: 'text-secondary-500',
          to: '/account/orders/:param',
          param: '_id',
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
