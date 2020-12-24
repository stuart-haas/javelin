<template>
  <tr :class="active ? 'font-bold' : ''">
    <TableColumn v-for="(column, j) in columns" :key="j" :column="column" />
  </tr>
</template>

<script>
export default {
  props: {
    row: Object,
  },
  computed: {
    active() {
      return this.row.rowData.active;
    },
    columns() {
      return this.row.colData;
    },
  },
};
</script>
