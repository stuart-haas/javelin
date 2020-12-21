<template>
  <div
    class="flex justify-center bg-no-repeat bg-top bg-cover h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="pt-10 w-10/12 md:w-8/12 lg:w-4/12">
      <div class="py-4">
        <h1 class="h1">Register</h1>
      </div>
      <Form
        :fields="fields"
        dispatch="user/register"
        submitLabel="Register"
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
};
</script>
