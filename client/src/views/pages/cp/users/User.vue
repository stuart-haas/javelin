<template>
  <Content title="Edit User">
    <template v-slot:header>
      <Dropdown v-if="!currentUser" :items="items" />
    </template>
    <Panel>
      <Form
        :fields="fields"
        dispatch="put"
        api="user/cp"
        :param="id"
        submitLabel="Update"
        @success="success"
      />
    </Panel>
  </Content>
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
          focus: true,
        },
        {
          label: 'Email',
          name: 'email',
          required: true,
        },
        {
          key: 'roles',
          tag: 'select',
          label: 'Role',
          name: 'role',
          items: [],
        },
      ],
      items: [
        {
          label: 'Impersonate',
          icon: 'mask',
          click: this.impersonate,
        },
        {
          label: 'Delete',
          icon: 'trash-alt',
          class: 'bg-danger-500 text-white hover:bg-danger-600',
          click: this.deleteThis,
        },
      ],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user.user._id === this.$route.params.id;
    },
    userId() {
      return this.$store.state.user.user._id;
    },
    id() {
      return this.$route.params.id;
    },
    fields() {
      let roles = [
        {
          value: 'member',
          label: 'Member',
        },
        {
          value: 'admin',
          label: 'Admin',
        },
        {
          value: 'superadmin',
          label: 'Super Admin',
        },
      ];
      roles = roles.filter((role) => {
        if (this.$store.state.user.user.role === 'admin') {
          return role.value !== 'superadmin';
        }
        return role;
      });
      const formFields = this.mapFieldItemsData(
        roles,
        this.formFields,
        'roles',
        {
          label: 'label',
          value: 'value',
        }
      );
      return this.mapFieldData(this.user, formFields);
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
      const { message } = await this.$store.dispatch('delete', {
        api: 'user/cp',
        param,
      });
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/cp/users');
    },
    async impersonate() {
      const { id } = this.$route.params;
      const formData = { id };
      await this.$store.dispatch('post', {
        api: 'user/cp/impersonate',
        formData,
      });
      this.$router.go();
    },
    success({ user, message }) {
      if (user._id === this.$store.state.user.user._id) {
        this.$store.commit('user/setState', { name: 'user', value: user });
      }
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/cp/users');
    },
  },
};
</script>
