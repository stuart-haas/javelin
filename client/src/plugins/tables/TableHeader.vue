<template>
  <th @click="sort(field)" v-if="filter">
    <span
      class="th cursor-pointer"
      :class="sortIndex > 0 && sortKey === field.key ? 'active' : ''"
      >{{ field.label
      }}<transition name="fade"
        ><Icon :icon="sortIcon" class="text-gray-500" />
      </transition>
    </span>
  </th>
</template>

<script>
export default {
  props: {
    field: Object,
    sortKey: String,
    sortIndex: Number,
    sortDirections: Array,
    sortIcons: Array,
  },
  computed: {
    sortIcon() {
      return this.sortIcons[this.sortIndex];
    },
    filter() {
      return !this.field.hidden;
    },
  },
  methods: {
    sort(field) {
      this.$emit('sort', field);
    },
  },
};
</script>
