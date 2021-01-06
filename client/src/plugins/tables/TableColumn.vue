<template>
  <td v-if="isColumnVisible">
    <component v-if="isFieldVisible" :is="tag" v-bind="attrs" v-on="listeners">
      {{ column.value }}
    </component>
  </td>
</template>

<script>
export default {
  props: {
    column: Object,
  },
  computed: {
    isColumnVisible() {
      return !this.column.hidden;
    },
    isFieldVisible() {
      return !this.column.boolQuery;
    },
    tag() {
      return this.column.tag || 'span';
    },
    attrs() {
      /* eslint-disable */
      const { ...attrs } = this.column.attrs;

      return attrs;
    },
    listeners() {
      const { ...listeners } = this.$listeners;

      return listeners;
    },
  },
};
</script>

<style scoped>
td {
  @apply p-3;
}

td:last-of-type {
  text-align: right;
}
</style>
