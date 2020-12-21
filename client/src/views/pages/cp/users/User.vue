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
      api="user"
      :param="id"
      :submitLabel="id ? 'Update' : 'Create'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      formFields: [
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Email',
          name: 'email',
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    fields() {
      return this.mapFieldData(this.user, this.formFields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const user = await this.$store.dispatch('get', {
          api: 'user/cp',
          param,
        });
        this.user = user;
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { user } = await this.$store.dispatch('delete', {
        api: 'user/cp',
        param,
      });
      if (user) {
        this.$router.push('/cp/users');
      }
    },
  },
};
</script>
