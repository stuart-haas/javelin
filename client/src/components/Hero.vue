<template>
  <div
    class="bg-no-repeat bg-center h-48 bg-cover"
    :style="{ 'background-image': `url(${image})` }"
  >
    <div class="w-10/12 m-auto flex flex-col justify-center h-full">
      <h1 class="h2 text-white">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    title: String,
  },
};
</script>
