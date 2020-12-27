<template>
  <div v-bind="$attrs" v-on="$listeners">
    <div
      v-if="arrows"
      class="button bg-gray-200 text-gray-600 hover:bg-gray-300 mr-2"
    >
      <span class="inline-block align-middle"
        ><Icon icon="arrow-left" class="inline-block align-middle"
      /></span>
    </div>
    <div
      v-for="(page, index) in pages"
      :key="index"
      class="button"
      :class="[getActive(index)]"
      @click="handlePaginate(index)"
    >
      <span class="inline-block align-middle">{{ page }}</span>
    </div>
    <div
      v-if="arrows"
      class="button bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2"
    >
      <span class="inline-block align-middle"
        ><Icon icon="arrow-right" class="inline-block align-middle"
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    arrows: {
      type: Boolean,
      default: false,
    },
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
    getActive(index) {
      return this.currentPage === index + 1
        ? 'bg-secondary-500 text-white hover:bg-secondary-600'
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300';
    },
    handlePaginate(index) {
      this.$emit('paginate', index);
    },
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply text-sm inline-block px-2.5 py-1 cursor-pointer transition duration-300;
}
</style>
