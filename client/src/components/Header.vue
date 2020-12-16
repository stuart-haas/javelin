<template>
  <div
    class="relative flex flex-wrap items-center justify-between px-8 py-2 bg-white border border-gray-300 border-b-1"
  >
    <div class="w-10/12 m-auto flex justify-between">
      <div class="relative flex justify-between">
        <router-link
          to="/tools"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black"
        >
          Tools
        </router-link>
        <router-link
          to="/materials"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-black"
        >
          Materials
        </router-link>
      </div>
      <UserMenu />
    </div>
  </div>
</template>

<script>
import UserMenu from './UserMenu.vue';

export default {
  components: {
    UserMenu,
  },
};
</script>

<style scoped></style>
