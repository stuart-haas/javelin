<template>
  <nav class="mt-2 space-y-6">
    <Link v-for="(item, index) in items" :item="item" :key="index" />
  </nav>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>
