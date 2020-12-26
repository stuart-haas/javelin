<template>
  <tr :class="[activeClass]">
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
    activeClass() {
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
}
tr {
  @apply border-b;
  @apply border-gray-300;
}
</style>
