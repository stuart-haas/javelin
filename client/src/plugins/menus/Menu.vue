<template>
  <nav :class="navClass">
    <Link
      v-for="(item, index) in items"
      :item="item"
      :direction="direction"
      :key="index"
    />
  </nav>
</template>

<script>
export default {
  props: {
    items: Array,
    direction: {
      type: String,
      default: 'vertical',
    },
  },
  computed: {
    navClass() {
      return this.direction === 'vertical'
        ? 'space-y-6'
        : 'flex items-center space-x-6';
    },
  },
};
</script>
