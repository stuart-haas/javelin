<template>
  <Content :title="id ? 'Edit Order' : 'New Order'">
    <template v-slot:header>
      <Button v-if="id" class="mt-3" theme="danger" @click="deleteThis">
        Delete
      </Button>
    </template>
    <Form
      :fields="fields"
      :dispatch="id ? 'put' : 'post'"
      api="order"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
      @success="success"
    />
  </Content>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      order: {},
      formFields: [
        {
          label: 'Date',
          name: 'createdAt',
          disabled: true,
          format: {
            function: format,
            pattern: 'MMMM d, yyyy h:mm:ss a',
          },
        },
        {
          label: 'Order Id',
          name: 'orderId',
          disabled: true,
        },
        {
          label: 'First Name',
          name: 'user.firstName',
          disabled: true,
        },
        {
          label: 'Last Name',
          name: 'user.lastName',
          disabled: true,
        },
        {
          label: 'Email',
          name: 'user.email',
          disabled: true,
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    fields() {
      return this.mapFieldData(this.order, this.formFields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const order = await this.$store.dispatch('get', {
          api: 'order/cp',
          param,
        });
        this.order = order;
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { order, message } = await this.$store.dispatch('delete', {
        api: 'order/cp',
        param,
      });
      if (order) {
        this.$toast({ type: 'success', message, duration: 3000 });
        this.$router.push('/cp/orders');
      }
    },
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 3000 });
      this.$router.push('/cp/orders');
    },
  },
};
</script>
