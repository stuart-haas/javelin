<template>
  <form @submit.prevent="submit" class="w-8/12 m-auto">
    <div class="space-y-6">
      <fieldset>
        <label for="street" class="block text-sm font-medium text-gray-700"
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
      <div class="text-center">
        <button
          type="submit"
          class="block w-full transition py-2 px-4 border-transparent border shadow-lg rounded text-white bg-green-500 hover:bg-green-600"
        >
          Save
        </button>
      </div>
      <div v-if="message" class="text-center">{{ message }}</div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      message: '',
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const user = this.$store.state.user.user;
      this.formData = user;
    },
    async submit() {
      const { formData } = this;
      const param = this.$store.state.user.user._id;
      const { user } = await this.$store.dispatch('put', {
        api: 'user',
        formData,
        param,
      });

      if (user) {
        this.$store.commit('user/setState', { name: 'user', value: user });
        this.message = 'User settings saved';
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
  },
};
</script>
