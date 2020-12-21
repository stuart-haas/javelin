<template>
  <div class="w-10/12">
    <div class="text-right">
      <Button
        v-if="id"
        class="mt-3"
        theme="red"
        :variant="{ base: '500', dark: '600' }"
        @click="deleteThis"
      >
        Delete
      </Button>
    </div>
    <Form
      :fields="fields"
      :dispatch="id ? 'put' : 'post'"
      api="product"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      formFields: [
        {
          label: 'Name',
          name: 'name',
        },
        {
          label: 'SKU',
          name: 'sku',
        },
        {
          label: 'Price',
          name: 'price',
        },
        {
          label: 'Inventory',
          name: 'inventory',
        },
        {
          tag: 'textarea',
          label: 'Description',
          name: 'description',
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    fields() {
      return this.mapFieldData(this.product, this.formFields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const product = await this.$store.dispatch('get', {
          api: 'product',
          param,
        });
        this.product = product;
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { product } = await this.$store.dispatch('delete', {
        api: 'product',
        param,
      });
      if (product) {
        this.$router.push('/cp/product');
      }
    },
  },
};
</script>
