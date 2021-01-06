<template>
  <tr :class="[activeClass]">
    <td v-if="actions.length" class="action">
      <input type="checkbox" :checked="selected" @change="handleSelect" />
    </td>
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
    selected: Boolean,
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    activeClass() {
      return this.row.active ? 'font-bold' : '';
    },
    columns() {
      return this.row.columns;
    },
  },
  methods: {
    handleSelect() {
      const { id } = this.row;
      this.$emit('select', { id });
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
td.action {
  @apply text-center;
}
td input[type='checkbox'] {
  @apply cursor-pointer;
}
</style>
