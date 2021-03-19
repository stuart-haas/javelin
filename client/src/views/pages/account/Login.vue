<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <Form
          :fields="fields"
          dispatch="user/login"
          api="user/login"
          @success="success"
          submitLabel="Login"
          class="box"
        />
        <router-link to="/register" class="mt-6">Register</router-link>
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
          placeholder: 'Username',
          required: true,
          focus: true,
        },
        {
          label: 'Password',
          name: 'password',
          type: 'password',
          placeholder: 'Password',
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
        this.$router.replace('/trackers');
      }
    },
  },
};
</script>
