<template>
  <div
    class="bg-no-repeat bg-top bg-cover h-screen"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="flex flex-col items-center justify-center h-full">
      <div class="w-10/12 md:w-8/12 lg:w-4/12">
        <slot> </slot>
      </div>
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
