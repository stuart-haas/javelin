<template>
  <Content title="Orders">
    <template v-slot:header>
      <div class="flex items-center">
        <Dropdown :items="items" />
      </div>
    </template>
    <Panel>
      <Table
        :data="data"
        :fields="fields"
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
            keys: ['createdAt', 'createdAt'],
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
            keys: ['user.firstName', 'user.lastName'],
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
        {
          label: 'Delete All',
          icon: 'trash-alt',
          class: 'bg-danger-500 text-white hover:bg-danger-600',
          click: this.deleteAll,
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
