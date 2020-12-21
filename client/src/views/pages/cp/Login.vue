<template>
  <Splash :image="image">
    <Form
      :fields="fields"
      dispatch="user/login"
      api="user/cp/login"
      submitLabel="Login"
      @success="success"
      class="shadow-lg px-4 py-8 rounded bg-gray-200 bg-opacity-75"
    />
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
        this.$router.replace('/cp');
      }
    },
  },
};
</script>
