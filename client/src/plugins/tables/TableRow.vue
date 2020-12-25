<template>
  <tr :class="[active]">
    <TableColumn
      v-for="(column, index) in columns"
      :key="index"
      :column="column"
    />
  </tr>
</template>

<script>
export default {
  props: {
    row: Object,
  },
  computed: {
    active() {
      return this.row.active ? 'font-bold' : '';
    },
    columns() {
      return this.row.columns;
    },
  },
};
</script>

<style scoped>
th {
  @apply p-3;
  @apply text-sm;
}
</style>
