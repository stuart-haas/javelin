<template>
  <Content title="User">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/users/register"
        >Register User</Button
      >
    </template>
    <Panel>
      <Table :data="data" :fields="fields" />
    </Panel>
  </Content>
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
          hidden: true,
        },
        {
          label: 'Avatar',
          key: 'avatar',
          tag: 'img',
          src: 'avatar',
          class: 'w-8 h-8 rounded-full',
          sortable: false,
        },
        {
          label: 'Username',
          key: 'username',
        },
        {
          label: 'Email',
          key: 'email',
        },
        {
          label: 'Role',
          key: 'role',
        },
        {
          label: 'Active Since',
          key: 'createdAt',
          filter: 'date',
        },
        {
          value: 'Edit',
          tag: 'router-link',
          class: 'text-secondary-500',
          to: '/cp/users/:param',
          param: '_id',
          hideOn: {
            key: 'role',
            value: 'superadmin',
            and: this.$store.state.user.user.role === 'admin',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTable(this.users, this.fields, {
        active: {
          key: '_id',
          value: this.$store.state.user.user && this.$store.state.user.user._id,
        },
      });
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
