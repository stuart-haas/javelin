<template>
  <div
    class="flex items-center justify-center bg-no-repeat bg-top bg-cover h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="w-10/12 md:w-8/12 lg:w-4/12">
      <Form
        :fields="fields"
        dispatch="user/login"
        api="user/cp/login"
        submitLabel="Login"
        @success="success"
        class="shadow-lg px-4 py-8 rounded bg-white bg-opacity-75"
      />
    </div>
  </div>
</template>

<script>
import image from '../../../assets/images/mountains.jpg';

export default {
  data() {
    return {
      image: image,
      fields: [
        {
          label: 'Username',
          name: 'username',
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
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
