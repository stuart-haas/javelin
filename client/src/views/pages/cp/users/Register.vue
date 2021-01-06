<template>
  <Content title="Register User">
    <Panel>
      <Form
        :fields="fields"
        api="user/cp/register"
        submitLabel="Register"
        @success="success"
      />
    </Panel>
  </Content>
</template>

<script>
export default {
  data() {
    return {
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
          label: 'Password',
          name: 'password',
          type: 'password',
          required: true,
        },
        {
          label: 'Confirm Password',
          name: 'passwordConfirm',
          type: 'password',
          required: true,
        },
        {
          key: 'roles',
          tag: 'select',
          label: 'Role',
          name: 'role',
          value: 'member',
          items: [],
        },
      ],
    };
  },
  computed: {
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
      return this.mapFieldData({ role: 'member' }, formFields);
    },
  },
  methods: {
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/cp/users');
    },
  },
};
</script>
