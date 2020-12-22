<template>
  <div
    class="relative flex flex-wrap items-center justify-between py-4 bg-white border border-gray-300 border-b-1"
  >
    <div class="w-10/12 m-auto flex justify-between">
      <div class="relative flex justify-between">
        <router-link
          to="/products"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black"
        >
          Products
        </router-link>
      </div>
      <div class="flex justify-between items-center">
        <router-link
          to="/cart"
          class="flex items-center relative cursor-pointer mr-8"
        >
          <Icon icon="toolbox" class="text-xl" />
          <div
            v-if="items.length"
            class="absolute top-full mt-0.5 w-2 h-2 bg-green-500 rounded-full transform left-1/2 -translate-x-1/2"
          ></div>
        </router-link>
        <div class="flex justify-between">
          <router-link
            v-if="!user"
            to="/login"
            class="text-sm leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-black ml-4"
            >Login</router-link
          >
          <router-link v-if="user" to="/account" class="relative">
            <div class="flex items-center space-between px-4 cursor-pointer">
              <div class="w-8 h-8">
                <img
                  :src="user && user.avatar"
                  class="rounded-full max-w-full h-auto align-middle"
                />
              </div>
              <div class="ml-4 text-sm">My Account</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
