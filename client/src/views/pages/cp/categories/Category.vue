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
      api="category"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {},
      formFields: [
        {
          label: 'Name',
          name: 'name',
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
  },
};
</script>
