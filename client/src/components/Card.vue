<template>
  <router-link class="card cursor-pointer" :to="`/products/${product._id}`">
    <div class="overflow-hidden">
      <div class="relative overflow-hidden h-48 md:h-64 lg:h-72">
        <div
          class="transition duration-300 card-image absolute w-full h-full bg-no-repeat bg-center bg-contain"
          :style="{ 'background-image': `url(${product.image})` }"
        ></div>
      </div>
      <div class="relative py-4 text-center">
        <p class="text">{{ product.name }}</p>
        <p class="text-sm mt-1">{{ product.price }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    index: Number,
    product: Object,
  },
};
</script>

<style scoped>
.card:hover .card-image {
  transform: scale(1.1);
}
</style>
