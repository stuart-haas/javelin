<template>
  <div
    v-bind="$attrs"
    v-on="$listeners"
    class="inline-block p-2 bg-white border border-gray-300 rounded space-x-2 m-auto"
  >
    <div
      v-for="(page, index) in pages"
      :key="index"
      class="text-sm text-white inline-block px-2.5 py-1 cursor-pointer transition duration-300 rounded"
      :class="[active(index)]"
      @click="paginate(index)"
    >
      <span class="inline-block align-middle">{{ page }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    currentPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    pages() {
      const { perPage, data } = this;
      return Math.ceil(data.length / perPage);
    },
  },
  methods: {
    active(index) {
      return this.currentPage === index + 1
        ? 'bg-secondary-500 hover:bg-secondary-600'
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300';
    },
    paginate(index) {
      this.$emit('paginate', index);
    },
  },
};
</script>
