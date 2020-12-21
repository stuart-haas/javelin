<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="h2">{{ title }}</h2>
      <slot name="header"></slot>
    </div>
    <div class="mt-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
