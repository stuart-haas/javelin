<template>
  <component
    :is="tag"
    v-bind="item.attrs"
    v-on="item.listeners"
    active-class="border-r-4 border-gray-700 text-blue-500"
    class="link block transition duration-300 px-2 py-1 border-r-4 border-transparent hover:text-blue-500"
  >
    {{ item.label }}
  </component>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    tag() {
      return this.item.tag || 'router-link';
    },
  },
};
</script>

<style scoped>
button.link:hover {
  @apply text-white;
}
</style>
