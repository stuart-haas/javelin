<template>
  <div
    class="flex flex-col items-center justify-center bg-no-repeat bg-top bg-cover h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="relative -top-1/4 w-10/12 md:w-8/12 lg:w-4/12">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
  },
};
</script>
