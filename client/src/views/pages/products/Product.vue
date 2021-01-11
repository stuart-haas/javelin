<template>
  <Page>
    <template #hero>
      <Hero
        v-if="product.category"
        :image="product.category.image"
        :title="product.category.name"
      />
    </template>
    <template #content>
      <div class="grid grid-cols-12 gap-20">
        <div class="col-span-4 mt-8">
          <img :src="product.image" class="h-auto w-full" />
        </div>
        <div class="col-span-8">
          <div
            class="mt-10 mb-4 text-xl font-bold tracking-wider border-b border-gray-300"
          >
            {{ product.name }}
          </div>
          <div class="my-8">
            {{ product.description }}
          </div>
          <div class="space-y-2 border-b border-gray-300 pb-4">
            <div>{{ product.price | currency }}</div>
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
              :disabled="!checkAvailability(product._id) || quantity === 0"
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
  </Page>
</template>

<script>
import Hero from '@/components/Hero.vue';

export default {
  components: {
    Hero,
  },
  data() {
    return {
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
      this.$store.commit('setState', { name: 'sidebarOpen', value: true });
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
        return item.id === id;
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
        return item._id === id;
      });
      return item ? true : false;
    },
  },
};
</script>
