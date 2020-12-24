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
          <th v-for="(field, index) in filteredFields" :key="index">
            {{ field.label }}
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
          class="slideUp"
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
      return this.data.map((item) => {
        return item.colData.filter((item) => {
          return !item.hidden;
        });
      });
    },
  },
  methods: {
    getRow(row) {
      return row.filter((item) => {
        return !item.hidden;
      });
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
