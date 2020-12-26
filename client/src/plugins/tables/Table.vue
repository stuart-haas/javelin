<template>
  <div>
    <input
      type="text"
      placeholder="Search"
      class="p-1 text-sm block w-full border border-gray-300 rounded my-2 bg-transparent"
      v-model="search"
      @input="input"
    />
    <table class="w-full table-auto text-left">
      <thead>
        <tr class="font-bold border-b border-gray-300">
          <TableHeader
            v-for="(field, index) in fields"
            :key="index"
            :field="field"
            :sortName="sortName"
            :sortIndex="sortIndex"
            :sortDirections="sortDirections"
            :sortIcons="sortIcons"
            @sort="sort(field)"
          />
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(row, index) in providedData"
          :key="index"
          :row="row"
        />
      </tbody>
    </table>
    <div v-if="!providedData.length" class="mt-4 text-sm">
      No results for that search.
    </div>
    <pre v-if="debug">{{ providedData | pretty }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    fields: Array,
    debug: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: '',
      sortName: '',
      sortIndex: 0,
      sortDirections: ['unsorted', 'asc', 'desc'],
      sortIcons: ['arrow-down', 'arrow-down', 'arrow-up'],
    };
  },
  computed: {
    providedData() {
      let data = this.data;
      if (this.sortIndex > 0) {
        data = this.sortTable(this.data, {
          key: this.sortName,
          direction: this.sortDirections[this.sortIndex],
        });
      }
      if (this.search) {
        const search = this.search.toLowerCase();
        data = this.searchTable(this.data, search);
      }
      return data;
    },
  },
  methods: {
    sort(field) {
      if (this.sortName !== field.name) this.sortIndex = 0;
      this.sortName = field.name;
      this.sortIndex = this.sortIndex === 0 ? 1 : this.sortIndex == 1 ? 2 : 0;
    },
    input(e) {
      const { value } = e.target;
      this.search = value;
    },
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>

<style scoped>
pre {
  @apply p-2;
  @apply bg-gray-100;
  @apply text-xs;
}
</style>
