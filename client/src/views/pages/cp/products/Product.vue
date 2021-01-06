<template>
  <Content :title="id ? 'Edit Product' : 'New Product'">
    <template v-slot:header>
      <Button v-if="id" class="mt-3" theme="danger" @click="deleteThis">
        Delete
      </Button>
    </template>
    <Panel>
      <Upload v-if="image" :field="image" @change="change" />
      <Form
        :fields="fields"
        :append="append"
        :dispatch="id ? 'put' : 'post'"
        api="product"
        :param="id"
        :submitLabel="id ? 'Update' : 'Create'"
        @success="success"
      />
    </Panel>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      categories: [],
      append: {},
      formFields: [
        {
          label: 'Name',
          name: 'name',
          required: true,
          focus: true,
        },
        {
          label: 'SKU',
          name: 'sku',
          required: true,
        },
        {
          label: 'Price',
          name: 'price',
          required: true,
        },
        {
          label: 'Inventory',
          name: 'inventory',
          required: true,
        },
        {
          tag: 'textarea',
          label: 'Description',
          name: 'description',
        },
        {
          tag: 'select',
          label: 'Category',
          name: 'category',
          value: {
            name: 'category._id',
          },
          items: [],
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    fields() {
      const formFields = this.mapFieldItemsData(
        this.categories,
        this.formFields,
        {
          label: 'name',
          value: '_id',
        }
      );
      return this.mapFieldData(this.product, formFields);
    },
    image() {
      return { name: 'image', label: 'Image', value: this.product.image };
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
      const categories = await this.$store.dispatch('get', {
        api: 'category',
      });
      this.categories = categories;
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { product, message } = await this.$store.dispatch('delete', {
        api: 'product',
        param,
      });
      if (product) {
        this.$toast({ type: 'success', message, duration: 2000 });
        this.$router.push('/cp/products');
      }
    },
    change({ field, value }) {
      this.$set(this.append, field.name, value);
    },
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/cp/products');
    },
  },
};
</script>
