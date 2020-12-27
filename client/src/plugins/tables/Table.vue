<template>
  <div>
    <input type="text" placeholder="Search" v-model="search" @input="input" />
    <table>
      <thead>
        <tr>
          <TableHeader
            v-for="(field, index) in fields"
            :key="index"
            :field="field"
            :orderBy="orderBy"
            :orderByIndex="orderByIndex"
            :sortOptions="sortOptions"
            :sortIcons="sortIcons"
            @sort="sort(field)"
          />
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(row, index) in paginatedData"
          :key="index"
          :row="row"
        />
      </tbody>
    </table>
    <div v-if="!filteredData.length" class="mt-4 text-sm">
      No results for that search.
    </div>
    <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
      <div class="space-y-2">
        <div>Total Results: {{ data.length }}</div>
        <div>Filtered Results: {{ filteredData.length }}</div>
        <div>Paginated Results: {{ paginatedData.length }}</div>
      </div>
      <div>
        <Pagination
          v-if="filteredData.length > perPage"
          :data="filteredData"
          :currentPage="currentPage"
          :perPage="perPage"
          @paginate="paginate"
        />
      </div>
    </div>
    <pre v-if="debug">{{ filteredData | pretty }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    fields: Array,
    options: Object,
    debug: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: '',
      orderByIndex: 0,
      orderBy: '',
      sortOptions: ['unsorted', 'asc', 'desc'],
      sortIcons: ['arrow-down', 'arrow-down', 'arrow-up'],
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    sortedData() {
      if (this.orderByIndex > 0) {
        return this.sortTable(this.data, {
          orderBy: this.orderBy,
          sort: this.sortOptions[this.orderByIndex],
        });
      }
      return this.data;
    },
    filteredData() {
      if (this.search) {
        const search = this.search.toLowerCase();
        return this.searchTable(this.sortedData, search);
      }
      return this.sortedData;
    },
    paginatedData() {
      if (this.filteredData.length <= this.perPage) return this.filteredData;
      return this.paginateTable(this.filteredData, {
        currentPage: this.currentPage,
        perPage: this.perPage,
      });
    },
  },
  mounted() {
    if (this.options) {
      this.orderBy = this.options.orderBy || '';
      this.currentPage = this.options.currentPage || 1;
      this.perPage = this.options.perPage || 10;
      this.orderByIndex = this.sortOptions.findIndex(
        (option) => option === this.options.sort
      );
    }
  },
  methods: {
    paginate(index) {
      this.currentPage = index + 1;
    },
    sort(field) {
      if (this.orderBy !== field.name) this.orderByIndex = 0;
      this.orderBy = field.name;
      this.orderByIndex =
        this.orderByIndex === 0 ? 1 : this.orderByIndex == 1 ? 2 : 0;
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

<style lang="postcss" scoped>
table {
  @apply w-full table-auto text-left text-sm;
}
table thead tr {
  @apply font-bold border-b border-gray-300;
}
input {
  @apply p-1 text-sm block w-full border border-gray-300 rounded my-2 bg-transparent;
}
pre {
  @apply mt-4;
  @apply p-2;
  @apply bg-gray-100;
  @apply text-xs;
}
</style>
