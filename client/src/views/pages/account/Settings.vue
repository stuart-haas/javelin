<template>
  <div class="w-full">
    <h1 class="text-4xl">Settings</h1>
    <div class="mt-6">
      <form @submit.prevent="submit" class="w-8/12 m-auto">
        <div class="py-5 space-y-6">
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
              <h3 class="my-6 font-bold text-xl">Shipping Address</h3>
              <div class="grid grid-cols-2 gap-6">
                <div class="mb-6">
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-900"
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
                </div>
                <div class="mb-6">
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-900"
                    >Last Name</label
                  >
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                    :value="formData['lastName']"
                    @input="input"
                  />
                </div>
              </div>
              <div class="mb-6">
                <label
                  for="street"
                  class="block text-sm font-medium text-gray-900"
                  >Street</label
                >
                <input
                  type="text"
                  name="street"
                  id="street"
                  class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                  :value="formData['street']"
                  @input="input"
                />
              </div>
              <div class="grid grid-cols-3 gap-6">
                <div class="mb-6">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-900"
                    >City</label
                  >
                  <input
                    type="text"
                    name="city"
                    id="city"
                    class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                    :value="formData['city']"
                    @input="input"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-900"
                    >State</label
                  >
                  <input
                    type="text"
                    name="state"
                    id="state"
                    class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                    :value="formData['state']"
                    @input="input"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="zipCode"
                    class="block text-sm font-medium text-gray-900"
                    >Zip Code</label
                  >
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                    :value="formData['zipCode']"
                    @input="input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center px-6 mt-3">
          <button
            type="submit"
            class="block w-full transition py-2 px-4 border-transparent border shadow-lg text-sm font-medium rounded text-white bg-green-500 hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
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
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
  },
};
</script>
