<template>
  <div class="mt-4 w-10/12 m-auto grid grid-cols-3 gap-6">
    <div v-for="product in products" :key="product._id" class="card col-auto">
      <div class="rounded shadow-lg overflow-hidden">
        <div class="relative overflow-hidden h-96">
          <div
            class="transition duration-300 ease-in-out card-image absolute w-full h-full bg-no-repeat bg-center bg-cover"
            :style="{ 'background-image': `url(${image})` }"
          ></div>
          <div
            class="card-buttons transition duration-300 ease-in-out absolute bottom-0 w-full"
          >
            <div class="flex align-center space-between text-center">
              <div
                class="flex items-center justify-around transition duration-300 ease-in-out bg-blue-500 bg-opacity-90 px-2 py-4 flex-1"
              >
                <div
                  class="transition duration-300 ease-in-out relative w-6 h-6 rounded-full bg-blue-700 hover:bg-blue-900 cursor-pointer"
                >
                  <Icon
                    icon="minus"
                    class="text-white"
                    @click="decreaseQuantity(product._id)"
                  />
                </div>
                <Icon icon="toolbox" class="text-white text-2xl" />
                <div
                  class="transition duration-300 ease-in-out relative w-6 h-6 rounded-full bg-blue-700 hover:bg-blue-900 cursor-pointer"
                >
                  <Icon
                    icon="plus"
                    class="text-white"
                    @click="increaseQuantity(product._id)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative p-4 text-center">
          <p class="text-lg text-gray-700">{{ product.name }}</p>
          <p class="text-sm text-gray-700 mt-2">{{ product.formattedPrice }}</p>
          <div
            v-if="getItemQuantity(product._id) > 0"
            class="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-green-500"
          >
            <p
              class="text-sm text-white absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
            >
              {{ getItemQuantity(product._id) }}
            </p>
          </div>
          <div
            v-if="user"
            class="absolute bottom-2 right-2 w-6 h-6 cursor-pointer"
          >
            <Icon icon="heart" class="text-gray-300 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from '../../assets/images/tools.jpg';

export default {
  data() {
    return {
      products: [],
      image: image,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const products = await this.$store.dispatch('get', { api: 'product' });
      this.products = products;
    },
    increaseQuantity(id) {
      const quantity = this.getItemQuantity(id) + 1;
      const formData = { id, quantity };
      this.addToCart(formData);
    },
    decreaseQuantity(id) {
      let quantity = this.getItemQuantity(id);
      quantity = quantity > 0 && quantity - 1;
      const formData = { id, quantity };
      this.addToCart(formData);
      if (!quantity) {
        this.removeFromCart({ id });
      }
    },
    async addToCart(formData) {
      await this.$store.dispatch('cart/add', { formData });
    },
    async removeFromCart(formData) {
      await this.$store.dispatch('cart/remove', { formData });
    },
    getItemQuantity(id) {
      const item = this.$store.state.cart.cart.items.find((item) => {
        return item.id == id;
      });
      return item ? item.quantity : 0;
    },
  },
};
</script>

<style scoped>
.card:hover .card-image {
  transform: scale(1.2);
}
.card:hover .card-buttons {
  transform: translateY(0);
}
.card-buttons {
  transform: translateY(100%);
}
</style>
