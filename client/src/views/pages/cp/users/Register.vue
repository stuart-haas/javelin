<template>
  <div class="w-10/12">
    <Form
      :fields="fields"
      api="user/register"
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
