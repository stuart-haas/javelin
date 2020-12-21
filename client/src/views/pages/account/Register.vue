<template>
  <Splash :image="image">
    <div class="py-4">
      <h1 class="h1">Register</h1>
    </div>
    <Form
      :fields="fields"
      dispatch="user/register"
      submitLabel="Register"
      class="shadow-lg px-4 py-8 rounded bg-white bg-opacity-75"
    />
  </Splash>
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
      ],
    };
  },
};
</script>
