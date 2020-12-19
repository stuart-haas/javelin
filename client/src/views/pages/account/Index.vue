<template>
  <div class="w-10/12 m-auto">
    <div class="grid grid-cols-12 gap-6 h-screen">
      <div class="col-span-4 border-r pt-8">
        <h1 class="h1">Your Account</h1>
        <div class="mt-6 space-y-6">
          <router-link
            to="/account/orders"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-200 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Orders</router-link
          >
          <router-link
            to="/account/favorites"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-200 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Favorites</router-link
          >
          <router-link
            to="/account/settings"
            active-class="border-r-4 border-gray-700"
            class="block transition duration-200 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
            >Settings</router-link
          >
          <span
            class="cursor-pointer inline-block transition py-2 px-4 border-transparent border shadow-lg text-sm font-medium rounded text-white bg-red-500 hover:bg-red-600"
            @click="logout"
            >Logout</span
          >
        </div>
      </div>
      <div class="col-span-8 pt-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/');
      }
    },
  },
};
</script>
