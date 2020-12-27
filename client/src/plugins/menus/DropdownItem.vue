<template>
  <component
    v-if="show"
    :is="tag"
    v-bind="attrs"
    v-on="listeners"
    class="flex p-2 hover:bg-gray-300 transition duration-300 cursor-pointer items-center justify-between"
  >
    <Icon v-if="item.icon" :icon="item.icon" class="mr-6" /><span>{{
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
