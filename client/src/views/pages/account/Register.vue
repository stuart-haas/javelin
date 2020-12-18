<template>
  <div
    class="flex justify-center bg-no-repeat bg-top h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="pt-10 w-10/12 md:w-8/12 lg:w-4/12">
      <div class="py-4">
        <h1 class="text-4xl">Register</h1>
      </div>
      <form
        @submit.prevent="submit"
        class="shadow-lg py-4 rounded border bg-white bg-opacity-75"
      >
        <div class="space-y-6 p-6">
          <fieldset>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              type="text"
              name="username"
              id="username"
              class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
              v-model="formData['username']"
              @input="input"
            />
          </fieldset>
          <fieldset>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              type="text"
              name="email"
              id="email"
              class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
              v-model="formData['email']"
              @input="input"
            />
          </fieldset>
          <fieldset>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              type="password"
              name="password"
              id="password"
              class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
              v-model="formData['password']"
              @input="input"
            />
          </fieldset>
          <fieldset>
            <label
              for="passwordConfirm"
              class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
              v-model="formData['confirmPassword']"
              @input="input"
            />
          </fieldset>
          <div class="text-center">
            <button
              type="submit"
              class="block w-full transition py-2 px-4 border-transparent border shadow-lg rounded text-white bg-green-500 hover:bg-green-600"
            >
              Register
            </button>
            <router-link to="/login" class="block mt-6 underline"
              >Login</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import image from '../../../assets/images/mountains.jpg';

export default {
  data() {
    return {
      formData: {},
      image: image,
    };
  },
  methods: {
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
    submit() {
      const { formData } = this;
      this.$store.dispatch('user/register', { formData });
    },
  },
};
</script>
