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
      <router-link
        v-for="(item, index) in item.items"
        :to="item.to"
        :key="index"
        class="block mt-4 text-right pr-4 text-gray-500"
        :active-class="'text-blue-500'"
      >
        <span>{{ item.label }}</span>
      </router-link>
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
