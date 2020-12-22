<template>
  <Content title="User">
    <template v-slot:header>
      <Button theme="secondary" tag="router-link" to="/cp/users/register"
        >Register User</Button
      >
    </template>
    <Table :data="data" :fields="fields" />
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
          attrs: {
            src: 'avatar',
            class: 'w-8 h-8 rounded-full',
          },
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
          value: 'Edit',
          tag: 'router-link',
          /*hiddenIf: {
            key: 'role',
            value: 'superadmin',
            condition: this.$store.state.user.user.role === 'admin',
          },*/
          attrs: {
            class: 'text-blue-500',
            to: '/cp/users/:param',
            param: '_id',
          },
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTableData(this.users, this.fields, {
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
