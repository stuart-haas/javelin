<template>
  <Content :title="id ? 'Edit Product' : 'New Product'">
    <template v-slot:header>
      <Button v-if="id" class="mt-3" theme="danger" @click="deleteThis">
        Delete
      </Button>
    </template>
    <Upload :field="image" @change="change" />
    <Form
      :fields="fields"
      :append="append"
      :dispatch="id ? 'put' : 'post'"
      api="product"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
    />
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
      return this.mapFieldData(this.product, formFields, {
        category: 'category._id',
      });
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
      const { product } = await this.$store.dispatch('delete', {
        api: 'product',
        param,
      });
      if (product) {
        this.$router.push('/cp/product');
      }
    },
    change({ field, value }) {
      this.$set(this.append, field.name, value);
    },
  },
};
</script>
