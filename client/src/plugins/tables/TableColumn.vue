<template>
  <td v-if="hideColumn">
    <component v-if="hideField" :is="tag" v-bind="attrs" v-on="listeners">
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
    hideColumn() {
      return !this.column.hidden;
    },
    hideField() {
      return !this.column.hideOn;
    },
    attrs() {
      /* eslint-disable */
      const { tag, ...attrs } = this.column;

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
  @apply text-sm;
}

td:last-of-type {
  text-align: right;
}
</style>
