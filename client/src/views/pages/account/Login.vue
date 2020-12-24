<template>
  <Splash :image="image">
    <div class="py-4">
      <h1 class="h1">Login</h1>
    </div>
    <Form
      :fields="fields"
      dispatch="user/login"
      api="user/login"
      @success="success"
      submitLabel="Login"
      submitClass="w-full"
      class="shadow-lg px-4 py-8 rounded bg-gray-200 bg-opacity-75"
    >
      <router-link
        to="/register"
        class="block mt-3 text-center duration-300 transition hover:text-secondary-700"
        >Register</router-link
      >
    </Form>
  </Splash>
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
          label: 'Password',
          name: 'password',
          type: 'password',
          required: true,
        },
      ],
    };
  },
  methods: {
    success() {
      const query = this.$route.query.from;
      if (query) {
        this.$router.replace(query);
      } else {
        this.$router.replace('/products');
      }
    },
  },
};
</script>
