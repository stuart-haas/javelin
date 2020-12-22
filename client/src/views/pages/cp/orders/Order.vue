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
export default {
  data() {
    return {
      order: {},
      formFields: [
        {
          label: 'Order Id',
          name: 'orderId',
          disabled: true,
        },
        {
          label: 'First Name',
          name: 'user.firstName',
          required: true,
        },
        {
          label: 'Last Name',
          name: 'user.lastName',
          required: true,
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
          api: 'order',
          param,
        });
        this.order = order;
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { order, message } = await this.$store.dispatch('delete', {
        api: 'order',
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
