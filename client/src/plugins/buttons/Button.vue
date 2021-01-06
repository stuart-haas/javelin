<template>
  <component
    :is="tag"
    v-bind="$attrs"
    v-on="$listeners"
    class="text-sm p-2 transition duration-300 outline-none focus:outline-none rounded-sm shadow"
    :class="[
      `bg-${theme}-${variant.base} hover:bg-${theme}-${variant.hover}`,
      textColor,
    ]"
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
  computed: {
    textColor() {
      return this.theme === 'default'
        ? 'text-black border border-gray-300'
        : 'text-white';
    },
  },
};
</script>
