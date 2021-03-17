<template>
  <component
    v-if="isVisible"
    :is="tag"
    v-bind="attrs"
    v-on="listeners"
    @click="handleAction"
  >
    <span v-if="item.label">{{ item.label }}</span>
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
      const { tag, label, ...attrs } = this.item;

      attrs.class += this.item.divider ? ' dropdown-divider' : ' dropdown-item';

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
