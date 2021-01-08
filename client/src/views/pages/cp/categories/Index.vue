<template>
  <Content title="Categories">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/categories/new"
        >New Category</Button
      >
    </template>
    <Panel>
      <Table
        :data="data"
        :fields="fields"
        :options="{ orderBy: 'name', sort: 'desc' }"
      />
    </Panel>
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
          name: 'name',
          tag: 'router-link',
          param: '_id',
          attrs: {
            class: 'text-secondary-500',
            to: '/cp/categories/:param',
          },
        },
        {
          label: 'Last Updated',
          name: 'updatedAt',
          format: {
            filter: 'date',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTable(this.categories, this.fields);
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
