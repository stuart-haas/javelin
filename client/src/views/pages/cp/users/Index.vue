<template>
  <div class="mt-1">
    <div class="flex items-center justify-between">
      <h2 class="h2">Users</h2>
      <Button theme="secondary" tag="router-link" to="/cp/users/register"
        >Register User</Button
      >
    </div>
    <Table :data="data" :fields="fields" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      fields: [
        {
          label: 'Id',
          key: '_id',
          attrs: {
            hidden: true,
          },
        },
        {
          label: 'Username',
          key: 'username',
          tag: 'router-link',
          attrs: {
            class: 'text-blue-500',
            to: '/cp/users/:param',
            param: '_id',
          },
        },
        {
          label: 'Email',
          key: 'email',
        },
        {
          label: 'Role',
          key: 'role',
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTableData(this.users, this.fields);
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const users = await this.$store.dispatch('get', { api: 'user' });
      if (users) {
        this.users = users;
      }
    },
  },
};
</script>
