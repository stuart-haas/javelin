<template>
  <div v-bind="$attrs" v-on="$listeners">
    <button
      :disabled="currentPage === 1"
      class="button bg-gray-200 text-gray-600 hover:bg-gray-300 mr-2"
      @click="goToPrevious"
    >
      <Icon icon="arrow-left" class="inline-block align-middle" />
    </button>
    <button
      v-for="(page, index) in pageCount"
      :key="index"
      class="button"
      :class="[getActive(index)]"
      @click="goToSelected(index)"
    >
      <span class="inline-block align-middle">{{ page }}</span>
    </button>
    <button
      :disabled="currentPage === pageCount"
      class="button bg-gray-200 text-gray-600 hover:bg-gray-300 ml-2"
      @click="goToNext"
    >
      <Icon icon="arrow-right" class="inline-block align-middle" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    arrows: {
      type: Boolean,
      default: true,
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
    pageCount() {
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
    goToPrevious() {
      let index = this.currentPage - 1;
      this.paginate(index);
    },
    goToNext() {
      let index = this.currentPage + 1;
      this.paginate(index);
    },
    goToSelected(index) {
      this.paginate(index + 1);
    },
    paginate(index) {
      this.$emit('paginate', index);
    },
  },
};
</script>

<style lang="postcss" scoped>
.button {
  @apply text-xs inline-block px-2 py-1 transition duration-300;
}
</style>
