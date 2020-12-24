<template>
  <div>
    <input
      type="text"
      placeholder="Filter"
      class="p-1 text-sm block w-full border border-gray-300 rounded mb-2 bg-transparent"
    />
    <table class="w-full table-auto text-left">
      <thead>
        <tr class="font-bold border-b border-gray-300">
          <th
            v-for="(field, index) in filteredFields"
            :key="index"
            @click="sort(field)"
          >
            {{ field.label }}<Icon icon="caret-down" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in filteredData"
          :key="i"
          :class="[
            active === i ? 'font-bold' : '',
            i % 2 === 0 ? 'bg-gray-100' : '',
          ]"
        >
          <td v-for="(item, j) in getRow(row)" :key="j">
            <component v-if="item.tag" :is="item.tag" v-bind="item.attrs">
              {{ item.value }}
            </component>
            <span v-else>
              {{ item.value }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    fields: Array,
  },
  data() {
    return {
      sortKey: '',
      sortDirection: 'asc',
    };
  },
  computed: {
    active() {
      const index = this.data.findIndex((item) => {
        return item.rowData.active;
      });
      return index;
    },
    filteredFields() {
      return this.fields.filter((item) => {
        return !item.hidden;
      });
    },
    filteredData() {
      let rows = this.data.map((item) => {
        const { rowData } = item;
        const colData = item.colData.filter((item) => {
          return !item.hidden;
        });
        return { rowData, colData };
      });
      rows = this.sortTableData(rows, {
        key: this.sortKey,
        direction: this.sortDirection,
      });
      return rows;
    },
  },
  methods: {
    getRow(row) {
      return row.colData.filter((item) => {
        return !item.hidden;
      });
    },
    sort(field) {
      this.sortKey = field.key;
    },
  },
};
</script>

<style scoped>
th,
td {
  @apply p-3;
  @apply text-sm;
}
</style>
