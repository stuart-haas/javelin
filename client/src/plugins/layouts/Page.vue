<template>
  <div class="w-full">
    <slot name="hero"></slot>
    <div class="w-10/12 m-auto">
      <div class="py-3" v-if="hasHeader">
        <slot name="header"></slot>
      </div>
      <div class="grid grid-cols-12 gap-6 h-screen">
        <div class="col-span-3 border-r pt-8" v-if="hasSidebar">
          <slot name="sidebar"></slot>
        </div>
        <div
          class="pt-8"
          :class="[hasSidebar ? 'col-span-8' : 'col-span-full']"
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
