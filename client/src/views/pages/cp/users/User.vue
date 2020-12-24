<template>
  <Content title="Edit User" class="w-1/2">
    <template v-slot:header>
      <div>
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
          tag: 'select',
          label: 'Role',
          name: 'role',
          items: [],
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
      const formFields = this.mapFieldItemsData(roles, this.formFields, {
        label: 'label',
        value: 'value',
      });
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
