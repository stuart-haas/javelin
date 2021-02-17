<template>
  <component
    v-if="isVisible"
    :is="tag"
    v-bind="attrs"
    v-on="listeners"
    class="flex px-2 bg-white transition duration-300 cursor-pointer items-center justify-between hover:bg-gray-100"
    :class="[tag !== 'hr' && 'py-2']"
    @click="handleAction"
  >
    <Icon v-if="item.icon" :icon="item.icon" class="mr-2" /><span
      v-if="item.label"
      >{{ item.label }}</span
    >
  </component>
</template>

<script>
export default {
  props: {
    item: Object,
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isVisible() {
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
  methods: {
    handleAction() {
      const { item, data } = this;
      if(this.item.action && this.item.action({item, data})) {
        this.$emit('action', {item, data });
      }
    }
  }
};
</script>
