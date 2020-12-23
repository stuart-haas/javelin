<template>
  <div class="w-full">
    <slot name="hero"></slot>
    <div class="px-8">
      <div class="py-4" v-if="hasHeader">
        <slot name="header"></slot>
      </div>
      <div class="grid grid-cols-12 gap-6 h-screen">
        <div class="col-span-2 border-r pt-8" v-if="hasSidebar">
          <slot name="sidebar"></slot>
        </div>
        <div
          class="pt-8"
          :class="[hasSidebar ? 'col-span-10' : 'col-span-full']"
        >
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
