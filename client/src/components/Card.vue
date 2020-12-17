<template>
  <router-link class="card cursor-pointer" :to="`/products/${product._id}`">
    <div class="overflow-hidden">
      <div class="relative overflow-hidden h-48 md:h-64 lg:h-72">
        <div
          class="transition duration-300 ease-in-out card-image absolute w-full h-full bg-no-repeat bg-center bg-cover"
          :style="{ 'background-image': `url(${images[index]})` }"
        ></div>
      </div>
      <div class="relative py-4 text-center">
        <p class="text text-gray-700">{{ product.name }}</p>
        <p class="text-sm text-gray-700 mt-1">{{ product.formattedPrice }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import image1 from '../assets/images/planer.jpg';
import image2 from '../assets/images/tools.jpg';

export default {
  props: {
    index: Number,
    product: Object,
  },
  data() {
    return {
      images: [image1, image2],
    };
  },
};
</script>

<style scoped>
.card:hover .card-image {
  transform: scale(1.1);
}
</style>
