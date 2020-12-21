<template>
  <table class="w-full table-auto text-left mt-6">
    <tr class="font-bold border-b border-gray-300">
      <th v-for="(field, index) in filteredFields" :key="index">
        {{ field.label }}
      </th>
    </tr>
    <tr
      v-for="(row, i) in filteredData"
      :key="i"
      :class="active(i) ? 'font-bold' : ''"
    >
      <td v-for="(item, j) in row" :key="j">
        <component
          v-if="item.tag"
          :is="item.tag"
          v-bind="item.attrs"
          v-on="item.listeners"
        >
          {{ item.value }}
        </component>
        <span v-else>
          {{ item.value }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
    fields: Array,
  },
  computed: {
    filteredFields() {
      return this.fields.filter((item) => {
        if (item.attrs) {
          return !item.attrs.hidden;
        }
        return true;
      });
    },
    filteredData() {
      return this.data.map((item) => {
        return item.filter((el) => {
          if (el.attrs) {
            return !el.attrs.hidden;
          }
          return true;
        });
      });
    },
  },
  methods: {
    active(i) {
      const index = this.data.findIndex((item) => {
        return item.active || -1;
      });
      return index === i;
    },
  },
};
</script>

<style scoped>
th,
td {
  @apply p-3;
}
</style>
