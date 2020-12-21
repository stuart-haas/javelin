<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Categories</h2>
      <Button theme="secondary" tag="router-link" to="/cp/categories/new"
        >New Category</Button
      >
    </div>
    <Table :data="data" :fields="fields" />
  </div>
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
