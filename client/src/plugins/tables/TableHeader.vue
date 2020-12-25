<template>
  <th @click="sort" v-if="filter">
    <span :class="[active]"
      >{{ field.label
      }}<transition name="fade"><Icon :icon="sortIcon" /> </transition>
    </span>
  </th>
</template>

<script>
export default {
  props: {
    field: Object,
    sortKey: String,
    sortIndex: Number,
    sortDirections: Array,
    sortIcons: Array,
  },
  computed: {
    sortIcon() {
      return this.sortIcons[this.sortIndex];
    },
    filter() {
      return !this.field.hidden;
    },
    active() {
      return this.sortIndex > 0 && this.sortKey === this.field.key
        ? 'active'
        : '';
    },
  },
  methods: {
    sort() {
      this.$emit('sort', this.field);
    },
  },
};
</script>

<style lang="postcss" scoped>
th {
  @apply p-3;
  @apply text-sm;
}

th:last-of-type {
  text-align: right;
}

th span {
  @apply relative;
  @apply cursor-pointer;
}

th span svg {
  @apply absolute;
  @apply ml-0.5;
  @apply top-0.5;
  @apply text-gray-500;
  @apply transition;
  @apply duration-300;
  @apply opacity-0;
}

th span:hover svg,
th span.active svg {
  @apply opacity-100;
}
</style>
