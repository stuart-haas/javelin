<template>
  <div class="w-full">
    <div class="text-right">
      <Button
        v-if="id && user._id !== userId"
        theme="secondary"
        class="mr-3"
        @click="impersonate"
      >
        Impersonate
      </Button>
      <Button
        v-if="id && user._id !== userId"
        theme="danger"
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
          required: true,
        },
        {
          label: 'Email',
          name: 'email',
          required: true,
        },
        {
          tag: 'select',
          label: 'Role',
          name: 'role',
          items: [
            {
              value: 'member',
              label: 'Member',
            },
            {
              value: 'admin',
              label: 'Admin',
            },
          ],
        },
      ],
    };
  },
  computed: {
    userId() {
      return this.$store.state.user.user._id;
    },
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
    async impersonate() {
      const { id } = this.$route.params;
      const formData = { id };
      const { user } = await this.$store.dispatch('post', {
        api: 'user/cp/impersonate',
        formData,
      });
      if (user) {
        this.$router.go();
      }
    },
  },
};
</script>
