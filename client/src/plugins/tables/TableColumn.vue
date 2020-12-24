<template>
  <td v-if="filter">
    <component :is="column.tag || 'span'" v-bind="column.attrs">
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
    filter() {
      return !this.column.hidden;
    },
  },
};
</script>
