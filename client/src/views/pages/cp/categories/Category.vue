<template>
  <Content :title="id ? 'Edit Category' : 'New Category'">
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
      api="category"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
    />
  </Content>
</template>

<script>
export default {
  data() {
    return {
      category: {},
      append: {},
      formFields: [
        {
          label: 'Name',
          name: 'name',
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
      return this.mapFieldData(this.category, this.formFields);
    },
    image() {
      return { name: 'image', label: 'Image', value: this.category.image };
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const category = await this.$store.dispatch('get', {
          api: 'category',
          param,
        });
        this.category = category;
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { category } = await this.$store.dispatch('delete', {
        api: 'category',
        param,
      });
      if (category) {
        this.$router.push('/cp/categories');
      }
    },
    change({ field, value }) {
      this.$set(this.append, field.name, value);
    },
  },
};
</script>
