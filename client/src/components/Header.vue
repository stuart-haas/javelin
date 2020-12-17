<template>
  <div
    class="relative flex flex-wrap items-center justify-between py-2 bg-white border border-gray-300 border-b-1"
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
            v-if="cartItems.length"
            class="absolute top-full mt-0.5 w-2 h-2 bg-orange-dark rounded-full transform left-1/2 -translate-x-1/2"
          ></div>
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
    cartItems() {
      return this.$store.state.cart.cart.items;
    },
  },
};
</script>

<style scoped></style>
