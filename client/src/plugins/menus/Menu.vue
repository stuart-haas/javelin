<template>
  <nav :class="navClass">
    <Link
      v-for="(item, index) in items"
      :item="item"
      :direction="direction"
      :key="index"
    >
      <Icon v-if="item.icon" :icon="item.icon" class="mr-4" />
      <span class="pr-2">{{ item.label }}</span>
    </Link>
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
        ? 'space-y-6 pl-2'
        : 'flex items-center space-x-6';
    },
  },
};
</script>
