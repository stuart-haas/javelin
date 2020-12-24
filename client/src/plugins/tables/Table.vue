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
            {{ field.label
            }}<transition name="fade"
              ><Icon
                v-if="sortKey === field.key && sortDirectionIndex !== 0"
                :icon="sortIcon"
                class="text-gray-500"
              />
            </transition>
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
          <td v-for="(item, j) in filteredColumns(row)" :key="j">
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
      sortDirectionIndex: 0,
      sortDirections: ['', 'asc', 'desc'],
      sortIcons: ['', 'arrow-down', 'arrow-up'],
    };
  },
  computed: {
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
        direction: this.sortDirections[this.sortDirectionIndex],
      });
      console.log(rows);
      return rows;
    },
    active() {
      const index = this.data.findIndex((item) => {
        return item.rowData.active;
      });
      return index;
    },
    sortIcon() {
      return this.sortIcons[this.sortDirectionIndex];
    },
  },
  methods: {
    filteredColumns(row) {
      return row.colData.filter((item) => {
        return !item.hidden;
      });
    },
    sort(field) {
      this.sortKey = field.key;
      this.sortDirectionIndex =
        this.sortDirectionIndex === 0
          ? 1
          : this.sortDirectionIndex == 1
          ? 2
          : 0;
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
