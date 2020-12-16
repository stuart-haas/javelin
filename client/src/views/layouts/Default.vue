<template>
  <div class="Page">
    <div class="relative flex flex-wrap items-center justify-end px-2 py-3 bg-indigo-500 mb-3">
      <div class="relative flex justify-between">
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
          Products
        </a>
        <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
          Categories
        </a>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>