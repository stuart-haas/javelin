<template>
  <div class="space-y-3 pt-6 pb-4 border-t border-gray-300">
    <div class="flex justify-between items-center">
      <div class="flex items-center justify-between">
        <div class="uppercase">{{ product.name }}</div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Counter :min="0" :max="product.inventory" @change="counterChange" />
        </div>
        <div class="text-center">
          {{ product.formattedTotal }}
        </div>
        <div>
          <div
            class="w-4 h-4 bg-gray-500 rounded-full p-2.5 text-sm text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-500 transition duration-200"
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
  data() {
    return {
      quantity: 0,
      message: '',
      error: false,
    };
  },
  mounted() {
    this.quantity = this.getQuantityInCart(this.product.id);
  },
  methods: {
    async addToCart(id) {
      const { quantity } = this;
      const formData = { id, quantity };
      const success = await this.$store.dispatch('cart/add', { formData });
      if (success) {
        this.message = 'Cart updated';
        this.error = false;
      }
      if (quantity == 0) {
        this.removeFromCart(formData);
      }
    },
    async removeFromCart(formData) {
      await this.$store.dispatch('cart/remove', { formData });
    },
    input(e) {
      const { value } = e.target;
      if (!value) return;
      let val = parseInt(value);
      if (!isNaN(val)) {
        if (Math.sign(val) === -1) {
          val = 1;
        }
        if (val > this.product.inventory) {
          val = this.product.inventory;
          this.message = `Sorry, we only have ${this.product.inventory} in stock.`;
          this.error = true;
        } else {
          this.message = '';
          this.error = false;
        }
      }
      this.quantity = val;
    },
    getQuantityInCart(id) {
      const item = this.$store.state.cart.items.find((item) => {
        return item.id == id;
      });
      return item ? item.quantity : 0;
    },
    checkAvailability(id) {
      const quantity = this.getQuantityInCart(id);
      return quantity > this.product.inventory ? false : true;
    },
    checkQuantityChange(product) {
      return this.quantity == product.quantity;
    },
    counterChange(count) {},
  },
};
</script>
