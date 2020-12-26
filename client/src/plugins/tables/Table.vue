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
    options: {
      type: Object,
      default() {
        return {
          orderBy: '',
          sort: 'unsorted',
        };
      },
    },
    debug: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: '',
      orderBy: '',
      orderByIndex: 0,
      sortOptions: ['unsorted', 'asc', 'desc'],
      sortIcons: ['arrow-down', 'arrow-down', 'arrow-up'],
    };
  },
  computed: {
    providedData() {
      let data = this.data;
      if (this.orderByIndex > 0) {
        data = this.sortTable(this.data, {
          orderBy: this.orderBy,
          sort: this.sortOptions[this.orderByIndex],
        });
      }
      if (this.search) {
        const search = this.search.toLowerCase();
        data = this.searchTable(this.data, search);
      }
      return data;
    },
  },
  mounted() {
    this.orderBy = this.options.orderBy;
    this.orderByIndex = this.sortOptions.findIndex(
      (option) => option === this.options.sort
    );
  },
  methods: {
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
