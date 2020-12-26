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
          name: '_id',
          hidden: true,
        },
        {
          label: 'Avatar',
          name: 'avatar',
          tag: 'img',
          src: 'avatar',
          class: 'w-8 h-8 rounded-full',
          sortable: false,
          filterable: false,
        },
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Email',
          name: 'email',
        },
        {
          label: 'Role',
          name: 'role',
        },
        {
          label: 'Active Since',
          name: 'createdAt',
          format: {
            filter: 'date',
          },
        },
        {
          value: 'Edit',
          name: 'edit',
          tag: 'router-link',
          class: 'text-secondary-500',
          to: '/cp/users/:param',
          param: '_id',
          boolQuery: `item['role'] === 'superadmin' && ${
            this.$store.state.user.user.role !== 'superadmin'
          }`,
        },
      ],
    };
  },
  computed: {
    data() {
      return this.mapTable(this.users, this.fields, {
        active: {
          name: '_id',
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
