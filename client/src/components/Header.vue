<template>
  <div
    class="relative flex flex-wrap items-center justify-between px-4 py-2 bg-white border border-gray-300 border-b-1"
  >
    <div class="relative flex justify-between">
      <a
        class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black"
      >
        Products
      </a>
      <a
        class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black"
      >
        Categories
      </a>
    </div>
    <div class="relative flex justify-between">
      <router-link
        v-if="!user"
        to="/login"
        class="text-sm leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-black"
        >Login</router-link
      >
      <div class="w-10 h-10">
        <img
          :src="user && user.avatar"
          class="rounded-full max-w-full h-auto align-middle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>

<style scoped></style>
