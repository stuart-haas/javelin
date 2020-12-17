<template>
  <div class="flex justify-between">
    <router-link
      v-if="!user"
      to="/account/login"
      class="text-sm leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-black ml-4"
      >Login</router-link
    >
    <div v-if="user" class="relative" v-click-outside="close">
      <div
        class="flex items-center space-between px-4 cursor-pointer"
        @click="toggle"
      >
        <div class="w-8 h-8">
          <img
            :src="user && user.avatar"
            class="rounded-full max-w-full h-auto align-middle"
          />
        </div>
        <div class="ml-4 text-sm">My Account</div>
      </div>
      <transition name="fade">
        <div
          v-show="isOpen"
          class="absolute top-full w-full left-1/2 transform -translate-x-1/2"
        >
          <div
            class="space-y-3 text-center mt-2 py-4 px-2 bg-blue-500 rounded-b shadow-lg border"
          >
            <router-link
              to="/account/orders"
              class="px-3 block text-white text-sm w-full hover:underline"
              >Orders</router-link
            >
            <router-link
              to="/account/favorites"
              class="px-3 block text-white text-sm w-full hover:underline"
              >Favorites</router-link
            >
            <div class="border-t border-gray-100"></div>
            <router-link
              to="/account/settings"
              class="px-3 block text-white text-sm w-full hover:underline"
              >Settings</router-link
            >
            <span
              class="px-3 block text-white text-sm cursor-pointer w-full hover:underline"
              @click="logout"
              >Logout</span
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  beforeRouteLeave(to, from, next) {
    this.open = false;
    next();
  },
  methods: {
    toggle() {
      this.isOpen = !this.open;
    },
    close() {
      this.isOpen = false;
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
