<template>
  <component
    v-if="show"
    :is="tag"
    v-bind="attrs"
    v-on="listeners"
    class="flex px-2 py-2 bg-white transition duration-300 cursor-pointer items-center justify-between hover:bg-gray-100"
  >
    <Icon v-if="item.icon" :icon="item.icon" class="mr-10" /><span>{{
      item.label
    }}</span>
  </component>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    show() {
      console.log(this.item.boolQuery);
      if (typeof this.item.boolQuery !== 'undefined') {
        return this.item.boolQuery;
      }
      return true;
    },
    tag() {
      return this.item.tag || 'div';
    },
    attrs() {
      /* eslint-disable */
      const { tag, ...attrs } = this.item;

      return attrs;
    },
    listeners() {
      return this.item;
    },
  },
};
</script>
