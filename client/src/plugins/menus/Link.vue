<template>
  <component
    :is="tag"
    v-bind="item.attrs"
    v-on="item.listeners"
    :active-class="linkActiveClass"
    :class="linkClass"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    item: Object,
    direction: {
      type: String,
      default: 'vertical',
    },
  },
  computed: {
    tag() {
      return this.item.tag || 'router-link';
    },
    linkActiveClass() {
      return this.direction === 'vertical'
        ? 'border-r-4 border-gray-700 text-blue-500'
        : 'border-b-2 border-gray-700 text-blue-500';
    },
    linkClass() {
      return this.direction === 'vertical'
        ? 'link block transition duration-300 px-2 py-1 border-r-4 border-transparent'
        : 'link block transition duration-300 text-center px-2 py-1 border-b-2 border-transparent';
    },
  },
};
</script>

<style scoped>
button.link:hover {
  @apply text-white;
}
</style>
