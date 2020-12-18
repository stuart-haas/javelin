<template>
  <div class="w-10/12 m-auto">
    <div class="grid grid-cols-12 gap-6 h-screen">
      <div class="col-span-4 border-r pt-8">
        <h1 class="text-4xl">Checkout</h1>
        <div class="mt-6 space-y-6 pr-6">
          <div v-for="product in items" :key="product.id">
            <p class="font-medium">
              {{ product.name }}
            </p>
            <div class="text-sm border-t border-gray-300 pt-1 pb-1 border-b">
              <p class="flex items-center justify-between pt-1 pb-1">
                <span class="text-gray-700">Quantity:</span
                ><span class="text-black">{{ product.quantity }}</span>
              </p>
              <p class="flex items-center justify-between">
                <span class="text-gray-700">Price:</span
                ><span class="text-black">{{ product.formattedPrice }}</span>
              </p>
              <p class="flex items-center justify-between">
                <span class="text-gray-700">Total:</span
                ><span class="text-black">{{ product.formattedTotal }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700">Total:</span>
            <span>{{ formattedTotal }}</span>
          </div>
        </div>
      </div>
      <div class="col-span-8 pt-8">
        <div class="w-full">
          <h1 class="text-4xl">Account</h1>
          <div v-if="!user" class="text-center">
            <router-link
              to="/login?from=cart/checkout"
              class="text-blue-500 hover:underline my-6 block"
              >Login to Your Account</router-link
            >
          </div>
          <h2 class="text-2xl mt-8">Shipping</h2>
          <form @submit.prevent="submit" class="mt-8">
            <div class="space-y-6">
              <div class="grid grid-cols-2 gap-6">
                <fieldset>
                  <label
                    for="firstName"
                    class="block text-sm font-medium text-gray-700"
                    >First Name</label
                  >
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
                    v-model="formData['firstName']"
                    @input="input"
                  />
                </fieldset>
                <fieldset>
                  <label
                    for="lastName"
                    class="block text-sm font-medium text-gray-700"
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
                <label
                  for="street"
                  class="block text-sm font-medium text-gray-700"
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
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
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
                  <label
                    for="state"
                    class="block text-sm font-medium text-gray-700"
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
                  <label
                    for="zipCode"
                    class="block text-sm font-medium text-gray-700"
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
              <div class="text-right">
                <button
                  type="submit"
                  class="inline-block transition py-2 px-4 border-transparent border shadow-lg rounded text-white bg-green-500 hover:bg-green-600"
                >
                  Continue
                </button>
              </div>
              <div v-if="message" class="text-center">{{ message }}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      message: '',
    };
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    formattedTotal() {
      return this.$store.state.cart.formattedTotal;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
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
