<template>
  <div
    class="relative flex flex-wrap items-center justify-between py-2 bg-white border border-gray-300 border-b-1"
  >
    <div class="w-10/12 m-auto flex justify-between">
      <div class="relative flex justify-between">
        <router-link
          to="/"
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
          <div class="">
            <div
              class="absolute bg-green-500 rounded-full w-4 h-4 top-1/2 transform -translate-y-1/2 ml-1"
            >
              <div
                class="text-white text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {{ cartCount }}
              </div>
            </div>
          </div>
        </router-link>
        <UserMenu />
      </div>
    </div>
  </div>
</template>

<script>
import UserMenu from './UserMenu.vue';

export default {
  components: {
    UserMenu,
  },
  computed: {
    cartCount() {
      return this.$store.state.cart.count;
    },
  },
};
</script>

<style scoped></style>
