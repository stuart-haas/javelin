<template>
  <div
    class="flex justify-center bg-no-repeat bg-top h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="pt-10 w-4/12">
      <div class="px-4 py-4">
        <h1 class="text-4xl">Register</h1>
      </div>
      <form @submit.prevent="submit">
        <div class="px-4 py-5 space-y-6 sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label
                for="username"
                class="block text-sm font-medium text-gray-900"
                >Username</label
              >
              <input
                type="text"
                name="username"
                id="username"
                class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                :value="formData['username']"
                @input="input"
              />
            </div>
            <div class="col-span-6">
              <label for="email" class="block text-sm font-medium text-gray-900"
                >Email</label
              >
              <input
                type="text"
                name="email"
                id="email"
                class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                :value="formData['email']"
                @input="input"
              />
            </div>
            <div class="col-span-6">
              <label
                for="password"
                class="block text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                type="password"
                name="password"
                id="password"
                class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                :value="formData['password']"
                @input="input"
              />
            </div>
            <div class="col-span-6">
              <label
                for="passwordConfirm"
                class="block text-sm font-medium text-gray-900"
                >Confirm Password</label
              >
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                :value="formData['confirmPassword']"
                @input="input"
              />
            </div>
          </div>
        </div>
        <div class="text-center px-6 mt-3">
          <button
            type="submit"
            class="block w-full transition py-2 px-4 border-transparent border shadow-lg text-sm font-medium rounded text-white bg-red-500 hover:bg-red-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import image from '../../assets/images/mountains.jpg';

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

<style scoped></style>
