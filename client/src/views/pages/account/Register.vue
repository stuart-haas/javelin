<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <Form
          :fields="fields"
          dispatch="user/register"
          @success="success"
          submitLabel="Register"
          submitClass="w-full"
          class="box"
        />
        <router-link to="/login" class="mt-6">Login</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import image from '@/assets/images/mountains.jpg';

export default {
  data() {
    return {
      image: image,
      fields: [
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
      ],
    };
  },
  methods: {
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/login');
    },
  },
};
</script>
