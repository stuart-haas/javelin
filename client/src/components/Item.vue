<template>
  <div class="space-y-3 pt-6 pb-4 border-t border-gray-300">
    <div class="grid grid-cols-12 gap-8 items-center">
      <div class="col-span-1">
        <div
          class="w-4 h-4 bg-red-500 rounded-full p-2.5 text-sm text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-200"
          @click="removeFromCart({ id: product.id })"
        >
          <Icon icon="times" />
        </div>
      </div>
      <div class="col-span-2">
        <router-link
          :to="`/products/${product.id}`"
          class="text-blue-500 hover:underline"
          >{{ product.name }}</router-link
        >
      </div>
      <div class="flex items-center col-span-2">
        <input
          type="number"
          min="1"
          :max="product.inventory"
          v-model="quantity"
          @input="input"
          class="border rounded-l p-2 w-24 text-center"
        />
        <button
          :disabled="
            !checkAvailability(product.id) || checkQuantityChange(product)
          "
          class="border-transparent border shadow-lg rounded-r transition duration-200 ease-in-out bg-green-500 p-2 hover:bg-green-600 text-white"
          @click="addToCart(product.id)"
        >
          Update
        </button>
      </div>
      <div class="col-span-2 text-center">
        <p class="font-bold text-sm">Price</p>
        {{ product.formattedPrice }}
      </div>
      <div class="col-span-1 text-center">
        <p class="font-bold text-sm">Total</p>
        {{ product.formattedTotal }}
      </div>
      <div
        class="col-span-4 text-center"
        :class="[error ? 'text-red-500' : 'text-green-500']"
      >
        {{ message }}
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
  },
};
</script>
