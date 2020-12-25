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
          <TableHeader
            v-for="(field, index) in fields"
            :key="index"
            :field="field"
            :sortKey="sortKey"
            :sortIndex="sortIndex"
            :sortDirections="sortDirections"
            :sortIcons="sortIcons"
            @sort="sort(field)"
          />
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(row, index) in filteredData"
          :key="index"
          :row="row"
        />
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
      sortIndex: 0,
      sortDirections: ['unsorted', 'asc', 'desc'],
      sortIcons: ['arrow-down', 'arrow-down', 'arrow-up'],
    };
  },
  computed: {
    filteredData() {
      if (this.sortIndex > 0) {
        return this.sortTableData(this.data, {
          key: this.sortKey,
          direction: this.sortDirections[this.sortIndex],
        });
      }
      return this.data;
    },
  },
  methods: {
    sort(field) {
      if (this.sortKey !== field.key) this.sortIndex = 0;
      this.sortKey = field.key;
      this.sortIndex = this.sortIndex === 0 ? 1 : this.sortIndex == 1 ? 2 : 0;
    },
  },
};
</script>
