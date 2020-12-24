<template>
  <component
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
    class="p-2 transition duration-300 text-white outline-none focus:outline-none rounded-sm shadow"
    :class="[`bg-${theme}-${variant.base} hover:bg-${theme}-${variant.hover}`]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    theme: {
      type: String,
      default: 'primary',
    },
    variant: {
      type: Object,
      default: () => ({
        base: '500',
        hover: '600',
      }),
    },
  },
};
</script>
