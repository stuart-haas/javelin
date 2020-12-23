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
    <Table :data="data" :fields="fields" v-if="data.length" />
    <div v-else>There aren't any orders.</div>
  </Content>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      orders: [],
      fields: [
        {
          label: 'Date',
          key: 'createdAt',
          format: {
            function: format,
            pattern: 'MMMM d, yyyy h:mm:ss a',
          },
        },
        {
          label: 'Order Id',
          key: 'orderId',
        },
        {
          label: 'First Name',
          key: 'user.firstName',
        },
        {
          label: 'Last Name',
          key: 'user.lastName',
        },
        {
          label: 'Email',
          key: 'user.email',
        },
        {
          label: 'Status',
          key: 'status',
        },
        {
          value: 'View',
          tag: 'router-link',
          attrs: {
            class: 'text-blue-500',
            to: '/cp/orders/:param',
            param: '_id',
          },
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
