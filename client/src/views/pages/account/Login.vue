<template>
  <div
    class="flex justify-center bg-no-repeat bg-top h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="pt-10 w-10/12 md:w-8/12 lg:w-4/12">
      <div class="py-4">
        <h1 class="text-4xl">Login</h1>
      </div>
      <form
        @submit.prevent="submit"
        class="shadow-lg py-8 rounded border bg-white bg-opacity-75"
      >
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
          </div>
        </div>
        <div class="text-center px-6 mt-3">
          <button
            type="submit"
            class="block w-full transition py-2 px-4 border-transparent border shadow-lg text-sm font-medium rounded text-white bg-green-500 hover:bg-green-600"
          >
            Login
          </button>
          <router-link to="/account/register" class="block pt-8 underline"
            >Register</router-link
          >
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
    async submit() {
      const { formData } = this;
      const success = await this.$store.dispatch('user/login', { formData });

      if (success) {
        const query = this.$route.query.from;
        if (query) {
          this.$router.replace(query);
        } else {
          this.$router.replace('/products');
        }
      }
    },
  },
};
</script>
