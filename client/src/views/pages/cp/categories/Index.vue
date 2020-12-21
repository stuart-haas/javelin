<template>
  <Content title="Categories">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/categories/new"
        >New Category</Button
      >
    </template>
    <Table :data="data" :fields="fields" />
  </Content>
</template>

<script>
export default {
  data() {
    return {
      categories: [],
      fields: [
        {
          label: 'Name',
          key: 'name',
          tag: 'router-link',
          attrs: {
            class: 'text-blue-500',
            to: '/cp/categories/:param',
            param: '_id',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTableData(this.categories, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const categories = await this.$store.dispatch('get', { api: 'category' });
      if (categories) {
        this.categories = categories;
      }
    },
  },
};
</script>
