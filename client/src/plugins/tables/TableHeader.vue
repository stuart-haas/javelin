<template>
  <th @click="sort" v-if="show">
    <span :class="[activeClass, sortableClass]"
      >{{ field.label
      }}<transition name="fade"
        ><Icon v-if="sortable" :icon="icon" />
      </transition>
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
    icon() {
      return this.sortIcons[this.sortIndex];
    },
    show() {
      return !this.field.hidden;
    },
    sortable() {
      if (typeof this.field.sortable === 'undefined') {
        return true;
      }
      return this.field.sortable;
    },
    activeClass() {
      return this.sortIndex > 0 && this.sortKey === this.field.key
        ? 'active'
        : '';
    },
    sortableClass() {
      return this.sortable ? 'sortable' : '';
    },
  },
  methods: {
    sort() {
      if (!this.sortable) return;
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
