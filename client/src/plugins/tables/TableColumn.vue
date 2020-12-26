<template>
  <td v-if="showColumn">
    <component v-if="showField" :is="tag" v-bind="attrs" v-on="listeners">
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
    tag() {
      return this.column.tag || 'span';
    },
    showColumn() {
      return !this.column.hidden;
    },
    showField() {
      return !this.column.boolQuery;
    },
    attrs() {
      /* eslint-disable */
      const { tag, ...attrs } = this.column.attrs;

      return attrs;
    },
    listeners() {
      const { click, ...listeners } = this.$listeners;

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
