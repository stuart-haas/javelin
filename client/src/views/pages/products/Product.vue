<template>
  <div class="product">
    <div
      class="bg-no-repeat bg-center h-48 bg-cover"
      :style="{ 'background-image': `url(${image})` }"
    >
      <div class="w-10/12 m-auto flex flex-col justify-center h-full">
        <h1 class="text-2xl text-white">{{ product.name }}</h1>
      </div>
    </div>
    <div class="w-10/12 m-auto">
      <div class="py-8">
        {{ product.description }}
      </div>
      <div class="mt-2">{{ product.formattedPrice }}</div>
      <div class="mt-2">{{ product.inventory }} in stock</div>
      <div class="border-t border-gray-300 my-6"></div>
      <div class="mt-2">
        {{
          getQuantityInCart(product._id) > 0
            ? `You have ${getQuantityInCart(product._id)} in your cart.`
            : "You don't have any in your cart."
        }}
      </div>
      <div class="flex items-center">
        <div class="my-4 flex items-center">
          <input
            type="number"
            min="1"
            :max="product.inventory"
            v-model="quantity"
            @input="input"
            :disabled="!checkAvailability(product._id)"
            class="border rounded-l p-2 w-24 text-center"
          />
          <button
            :disabled="!checkAvailability(product._id)"
            class="border-transparent border shadow-lg rounded-r transition duration-200 ease-in-out bg-green-500 p-2 hover:bg-green-600 text-white"
            @click="addToCart(product._id)"
          >
            Add to Cart
          </button>
        </div>
        <button
          v-if="user"
          class="ml-6 border-transparent border p-2 shadow-lg rounded transition duration-200 ease-in-out"
          :class="[
            this.checkFavorite(product._id)
              ? 'bg-red-500 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300',
          ]"
          @click="toggleFavorite(product._id)"
        >
          Favorite
          <Icon icon="star" />
        </button>
      </div>
      <div v-if="message">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import image from '../../../assets/images/tools.jpg';

export default {
  data() {
    return {
      product: {},
      image: image,
      quantity: 1,
      message: '',
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
      const param = this.$route.params.id;
      const product = await this.$store.dispatch('get', {
        api: 'product',
        param,
      });
      this.product = product;
    },
    async addToCart(id) {
      console.log(this.checkAvailability(id));
      const quantity = this.getQuantityInCart(id) + this.quantity;
      const formData = { id, quantity };
      await this.$store.dispatch('cart/add', { formData });
    },
    async toggleFavorite(favorite) {
      const isFavorite = this.checkFavorite(favorite);
      const param = this.$store.state.user.user._id;
      const formData = { favorite };
      if (!isFavorite) {
        await this.$store.dispatch('user/addFavorite', { param, formData });
      } else {
        await this.$store.dispatch('user/removeFavorite', { param, formData });
      }
    },
    input(e) {
      const { value } = e.target;
      if (!value) return;
      let val = parseInt(value);
      if (!isNaN(val)) {
        if (Math.sign(val) === -1) {
          val = 1;
        }
        if (val >= this.product.inventory) {
          val = this.product.inventory;
          this.message = `Sorry, we only have ${this.product.inventory} in stock.`;
        } else {
          this.message = '';
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
      return quantity >= this.product.inventory ? false : true;
    },
    checkFavorite(id) {
      const item = this.$store.state.user.favorites.find((item) => {
        return item._id == id;
      });
      return item ? true : false;
    },
  },
};
</script>

<style scoped>
input:disabled,
button:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}
</style>
