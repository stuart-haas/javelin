<template>
  <form @submit.prevent="submit" class="w-10/12">
    <div class="space-y-6">
      <div class="grid grid-cols-2 gap-6">
        <fieldset>
          <label for="firstName" class="block text-sm font-medium text-gray-700"
            >First Name</label
          >
          <input
            type="text"
            name="firstName"
            id="firstName"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            :value="formData['firstName']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="lastName" class="block text-sm font-medium text-gray-700"
            >Last Name</label
          >
          <input
            type="text"
            name="lastName"
            id="lastName"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['lastName']"
            @input="input"
          />
        </fieldset>
      </div>
      <fieldset>
        <label for="street" class="block text-sm font-medium text-gray-700"
          >Street</label
        >
        <input
          type="text"
          name="street"
          id="street"
          class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
          v-model="formData['street']"
          @input="input"
        />
      </fieldset>
      <div class="grid grid-cols-3 gap-6">
        <fieldset>
          <label for="city" class="block text-sm font-medium text-gray-700"
            >City</label
          >
          <input
            type="text"
            name="city"
            id="city"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['city']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="state" class="block text-sm font-medium text-gray-700"
            >State</label
          >
          <input
            type="text"
            name="state"
            id="state"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['state']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="zipCode" class="block text-sm font-medium text-gray-700"
            >Zip Code</label
          >
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['zipCode']"
            @input="input"
          />
        </fieldset>
      </div>
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
    fetch() {
      const user = this.$store.state.user.user;
      this.formData = user || {};
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
        this.message = 'Shipping settings saved';
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
  },
};
</script>
