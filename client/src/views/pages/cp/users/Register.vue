<template>
  <div class="w-10/12">
    <Form
      :fields="fields"
      api="user/cp/register"
      submitLabel="Register"
      @success="success"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Email',
          name: 'email',
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
        },
        {
          label: 'Confirm Password',
          name: 'passwordConfirm',
          type: 'password',
        },
        {
          tag: 'select',
          label: 'Role',
          name: 'role',
          value: 'customer',
          items: [
            {
              value: 'customer',
              label: 'Customer',
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
  methods: {
    success() {
      this.$router.push('/cp/users');
    },
  },
};
</script>
