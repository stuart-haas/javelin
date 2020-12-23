<template>
  <div class="w-8 h-8">
    <img :src="src" class="rounded-full max-w-full h-auto align-middle" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>
