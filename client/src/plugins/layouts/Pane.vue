<template>
  <div class="p-4 rounded shadow border border-gray-300 bg-white">
    <div v-if="hasHeader || title" class="flex justify-between pb-2">
      <p v-if="title" class="font-bold text-xl">{{ title }}</p>
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    },
  },
};
</script>
