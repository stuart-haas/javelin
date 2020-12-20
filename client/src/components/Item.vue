<template>
  <div class="space-y-3 border-t border-gray-300">
    <div class="flex justify-between items-center">
      <div class="flex items-center justify-between">
        <div
          class="w-32 h-32 bg-no-repeat bg-center bg-contain mr-6"
          :style="{ 'background-image': `url(${product.image})` }"
        ></div>
        <div>{{ product.name }}</div>
      </div>
      <div class="flex items-center justify-between">
        <Counter
          class="mr-20"
          :min="1"
          :max="product.inventory"
          :current="product.quantity"
          @change="addToCart"
        />
        <div class="flex justify-items-center justify-between">
          <div class="text-center mr-20 w-20">
            {{ product.formattedTotal }}
          </div>
          <div
            class="w-4 h-4 bg-gray-400 rounded-full p-3 text-center text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out"
            @click="removeFromCart({ id: product.id })"
          >
            <Icon icon="times" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
  methods: {
    async addToCart(quantity) {
      const { id } = this.product;
      const formData = { id, quantity };
      await this.$store.dispatch('cart/add', { formData });
    },
    async removeFromCart(formData) {
      await this.$store.dispatch('cart/remove', { formData });
    },
  },
};
</script>
