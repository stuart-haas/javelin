<template>
  <div class="space-y-3 border-t border-gray-300">
    <div class="flex justify-between items-center py-2">
      <div class="flex items-center justify-between">
        <div
          class="w-28 h-28 bg-no-repeat bg-center bg-contain mr-6"
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
            {{ product.total | currency }}
          </div>
          <CloseButton @click="removeFromCart({ id: product.id })">
            <Icon icon="times" />
          </CloseButton>
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
