<template>
  <th @click="handleSort" v-if="isFieldVisible">
    <span :class="[activeClass, sortableClass]"
      >{{ field.label
      }}<transition name="fade"
        ><Icon v-if="isFieldSortable" :icon="icon" />
      </transition>
    </span>
  </th>
</template>

<script>
export default {
  props: {
    field: Object,
    orderBy: String,
    orderIndex: Number,
    sortOptions: Array,
    sortIcons: Array,
  },
  computed: {
    icon() {
      return this.sortIcons[this.orderIndex];
    },
    isFieldVisible() {
      return !this.field.hidden;
    },
    isFieldSortable() {
      if (typeof this.field.sortable === 'undefined') {
        return true;
      }
      return this.field.sortable;
    },
    activeClass() {
      return this.orderIndex > 0 && this.orderBy === this.field.name
        ? 'active'
        : '';
    },
    sortableClass() {
      return this.isFieldSortable ? 'sortable' : '';
    },
  },
  methods: {
    handleSort() {
      if (this.isFieldSortable) {
        this.$emit('sort', this.field);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
th {
  @apply p-3;
  @apply text-sm;
}

th:first-of-type {
  @apply pl-0;
  @apply text-left;
}

th:last-of-type {
  @apply text-right;
}

th span.sortable {
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
