<template>
  <div
    class="relative flex flex-wrap items-center justify-end py-2 bg-white border border-gray-300 border-b-1"
  >
    <div class="w-10/12 m-auto flex justify-between items-center">
      <p>Control Panel v1.0</p>
      <div class="flex items-center justify-between">
        <router-link v-if="user" to="/cp/profile" class="relative z-10">
          <div class="flex items-center space-between px-4 cursor-pointer">
            <div class="w-8 h-8">
              <img
                :src="user && user.avatar"
                class="rounded-full max-w-full h-auto align-middle"
              />
            </div>
            <div class="ml-4 text-sm">My Profile</div>
          </div>
        </router-link>
        <span
          class="cursor-pointer inline-block transition p-1 ml-6 border-transparent border shadow-lg text-sm font-medium rounded text-white bg-red-500 hover:bg-red-600"
          @click="logout"
          >Logout</span
        >
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
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/cp/login');
      }
    },
  },
};
</script>
