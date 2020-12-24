<template>
  <div v-bind="$attrs" v-on="$listeners">
    <div class="flex items-center justify-between">
      <p v-if="title" class="h2 font-medium">{{ title }}</p>
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
