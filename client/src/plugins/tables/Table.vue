<template>
  <div>
    <input
      :disabled="!data.length"
      type="text"
      placeholder="Search"
      v-model="search"
      @input="handleSearch"
    />
    <div v-if="hasActionsAndSelections" class="button-group">
      <div class="button-group-item">{{ selectedData.length }} selected</div>
      <Dropdown
        :items="actions"
        :data="{ selectedData }"
        hAlign="left"
        buttonClass="rounded-r border-l-0"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th v-if="hasActions">
            <input
              type="checkbox"
              v-model="isBulkAction"
              :indeterminate.prop="selectionIsIndeterminate"
              @change="handleBulkSelectRows"
            />
          </th>
          <TableHeader
            v-for="(field, index) in fields"
            :key="index"
            :field="field"
            :orderBy="orderBy"
            :orderIndex="orderIndex"
            :sortOptions="sortOptions"
            :sortIcons="sortIcons"
            @sort="handleSort(field)"
          />
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(row, index) in paginatedData"
          :key="index"
          :row="row"
          :actions="actions"
          :selected="isRowSelected(row)"
          @select="handleSelectRow"
        />
      </tbody>
    </table>
    <div v-if="hasNoFilteredData" class="mt-4 text-sm divide-x-4font-bold">
      {{ emptyResultsText }}
    </div>
    <div class="text-right mt-4">
      <Pagination
        :data="filteredData"
        :currentPage="currentPage"
        :perPage="perPage"
        @paginate="handlePaginate"
      />
    </div>
    <pre v-if="debug">
      {{ filteredData | pretty }}
      </pre
    >
  </div>
</template>

<script>
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default {
  components: {
    TableHeader,
    TableRow,
  },
  props: {
    data: Array,
    fields: Array,
    options: Object,
    actions: {
      type: Array,
      default() {
        return [];
      },
    },
    debug: {
      type: Boolean,
      default: false,
    },
    emptyResultsText: {
      type: String,
      default: 'Sorry, no results could be found.',
    },
  },
  data() {
    return {
      search: '',
      selectedData: [],
      orderIndex: 0,
      orderBy: '',
      sortOptions: ['unsorted', 'asc', 'desc'],
      sortIcons: ['arrow-down', 'arrow-down', 'arrow-up'],
      currentPage: 1,
      perPage: 25,
      isBulkAction: false,
    };
  },
  computed: {
    hasActions() {
      return this.filteredData.length && this.actions.length;
    },
    hasActionsAndSelections() {
      return this.selectedData.length && this.actions.length;
    },
    hasNoFilteredData() {
      return !this.filteredData.length;
    },
    selectionIsIndeterminate() {
      return (
        !this.isBulkAction &&
        this.selectedData.length &&
        this.selectedData.length !== this.paginatedData.length
      );
    },
    sortedData() {
      if (this.orderIndex > 0) {
        return this.sortTable(this.data, {
          orderBy: this.orderBy,
          sort: this.sortOptions[this.orderIndex],
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
      this.perPage = this.options.perPage || 25;
      this.orderIndex = this.sortOptions.findIndex(
        (option) => option === this.options.sort
      );
    }
  },
  methods: {
    handleSearch(e) {
      const { value } = e.target;
      this.search = value;
    },
    handleSort(field) {
      if (this.orderBy !== field.name) this.orderIndex = 0;
      this.orderBy = field.name;
      this.orderIndex =
        this.orderIndex === 0 ? 1 : this.orderIndex == 1 ? 2 : 0;
    },
    handlePaginate(index) {
      this.currentPage = index;
    },
    handleBulkSelectRows() {
      if (this.isBulkAction) {
        this.selectedData = this.paginatedData.map((item) => {
          return item.id;
        });
      } else {
        this.selectedData = [];
      }
      this.$emit('select', { selectedData: this.selectedData });
    },
    handleSelectRow({ id }) {
      this.toggleSelectRow(id);
      this.toggleBulkAction();
      this.$emit('select', { selectedData: this.selectedData });
    },
    toggleSelectRow(id) {
      if (!this.selectedData.includes(id)) {
        this.selectRow(id);
      } else {
        this.deselectRow(id);
      }
    },
    selectRow(id) {
      this.selectedData.push(id);
    },
    deselectRow(id) {
      const index = this.selectedData.indexOf(id);
      index !== -1 && this.selectedData.splice(index, 1);
    },
    toggleBulkAction() {
      this.isBulkAction =
        this.selectedData.length === this.paginatedData.length;
    },
    resetBulkAction() {
      this.isBulkAction = false;
      this.selectedData = [];
    },
    isRowSelected(row) {
      return !!this.selectedData.find((item) => {
        return item === row.id;
      });
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
.button-group .button-group-item {
  @apply border;
}
.button-group-item {
  @apply inline-block;
  @apply p-2;
  @apply text-sm;
}
.button-group-item:first-of-type {
  @apply rounded-l;
}
.button-group-item:last-of-type {
  @apply rounded-r;
}
.button-group-item:not(:last-of-type) {
  @apply border-r;
  @apply border-gray-300;
}
table {
  @apply w-full table-auto text-left text-sm;
}
table thead tr {
  @apply font-bold;
}
table tbody tr:first-of-type {
  @apply border-t border-gray-300;
}
input {
  @apply p-1 text-sm block w-full border border-gray-300 rounded my-2 bg-transparent;
}
pre,
code {
  @apply mt-4;
  @apply p-2;
  @apply bg-gray-100;
  @apply text-xs;
}
th input[type='checkbox'] {
  @apply cursor-pointer;
}
</style>
