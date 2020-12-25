<template>
  <component
    :is="tag"
    v-bind="attrs"
    v-on="listeners"
    class="flex p-2 hover:bg-gray-300 transition duration-300 cursor-pointer items-center justify-between"
  >
    <Icon v-if="item.icon" :icon="item.icon" class="mr-2" /><span>{{
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
