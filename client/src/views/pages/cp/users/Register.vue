<template>
  <div class="w-full">
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
          required: true,
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
          tag: 'select',
          label: 'Role',
          name: 'role',
          value: 'member',
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
  methods: {
    success() {
      this.$router.push('/cp/users');
    },
  },
};
</script>
