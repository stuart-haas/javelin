<template>
  <div class="product">
    <div
      class="bg-no-repeat bg-center h-48 bg-cover"
      :style="{ 'background-image': `url(${hero})` }"
    >
      <div class="w-10/12 m-auto flex flex-col justify-center h-full">
        <h1 class="h2 text-white">{{ product.name }}</h1>
      </div>
    </div>
    <div class="w-10/12 m-auto">
      <div class="my-8">
        {{ product.description }}
      </div>
      <div class="space-y-2 border-b border-gray-300 pb-4">
        <div>{{ product.formattedPrice }}</div>
        <div>{{ product.inventory }} in stock</div>
      </div>
      <div class="mt-4">
        {{
          getQuantityInCart(product._id) > 0
            ? `You have ${getQuantityInCart(product._id)} in your cart.`
            : "You don't have any in your cart."
        }}
      </div>
      <div class="mt-4 flex items-center">
        <Counter
          :min="0"
          :max="getMaxAvailabe(product)"
          :current="quantity"
          @change="updateQuantity"
        />
        <Button
          class="ml-4 mr-8"
          :disabled="!checkAvailability(product._id) || quantity == 0"
          @click="addToCart(product._id)"
        >
          Add to Cart
        </Button>
        <Button
          v-if="user"
          :theme="favorite ? 'red' : 'gray'"
          :variant="{ base: favorite ? '500' : '400' }"
          class="w-10 h-10 rounded-full"
          @click="toggleFavorite(product._id)"
        >
          <Icon icon="star" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import hero from '../../../assets/images/tools.jpg';

export default {
  data() {
    return {
      hero: hero,
      product: {},
      quantity: 0,
      favorite: false,
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
      this.favorite = this.checkFavorite(this.product._id);
    },
    async addToCart(id) {
      const quantity = this.getQuantityInCart(id) + this.quantity;
      const formData = { id, quantity };
      this.quantity = 0;
      await this.$store.dispatch('cart/add', { formData });
    },
    async toggleFavorite(favorite) {
      const isFavorite = this.checkFavorite(favorite);
      this.favorite = !this.favorite;
      const param = this.$store.state.user.user._id;
      const formData = { favorite };
      if (!isFavorite) {
        await this.$store.dispatch('user/addFavorite', { param, formData });
      } else {
        await this.$store.dispatch('user/removeFavorite', { param, formData });
      }
    },
    updateQuantity(value) {
      this.quantity = value;
    },
    getQuantityInCart(id) {
      const item = this.$store.state.cart.items.find((item) => {
        return item.id == id;
      });
      return item ? item.quantity : 0;
    },
    getMaxAvailabe(product) {
      return product.inventory - this.getQuantityInCart(product._id);
    },
    checkAvailability(id) {
      const quantity = this.getQuantityInCart(id);
      return quantity + this.quantity > this.product.inventory ? false : true;
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
