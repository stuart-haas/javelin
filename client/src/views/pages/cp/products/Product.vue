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
    <Upload :field="image" @change="change" />
    <Form
      :fields="fields"
      :append="append"
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
      categories: [],
      append: {},
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
      return this.mapFieldData(this.product, formFields);
    },
    image() {
      return { name: 'image', value: this.product.image };
    },
    otherData() {
      const dataCopy = { ...this.appendData };
      console.log(dataCopy);
      return dataCopy;
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
