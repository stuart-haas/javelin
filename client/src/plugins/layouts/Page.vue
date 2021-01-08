<template>
  <div class="h-full">
    <slot name="hero"></slot>
    <div class="py-4" v-if="hasHeader">
      <slot name="header"></slot>
    </div>
    <div class="flex min-h-full">
      <div class="border-r py-8 bg-gray-100 min-h-full w-1/6" v-if="hasSidebar">
        <slot name="sidebar"></slot>
      </div>
      <div class="flex-1 py-8 bg-white">
        <div class="px-16">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    },
    hasSidebar() {
      return !!this.$slots.sidebar;
    },
  },
};
</script>
