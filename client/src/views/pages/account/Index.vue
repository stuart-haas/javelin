<template>
  <div class="w-10/12 m-auto">
    <div class="grid grid-cols-12 gap-6 h-screen">
      <div class="col-span-4 border-r p-4">
        <h1 class="text-4xl">Your Account</h1>
        <div class="mt-6 space-y-6">
          <router-link class="block" to="/account/orders">Order</router-link>
          <router-link class="block" to="/account/favorites"
            >Favorites</router-link
          >
          <router-link class="block" to="/account/settings"
            >Settings</router-link
          >
          <span class="block cursor-pointer" @click="logout">Logout</span>
        </div>
      </div>
      <div class="col-span-8 pt-4">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
