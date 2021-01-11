<template>
  <Page>
    <template #sidebar>
      <div class="px-4">
        <div class="border-b border-gray-300 mb-6">
          <p class="text-xl">Your Cart</p>
        </div>
        <div class="space-y-6">
          <div v-for="product in items" :key="product.id">
            <p class="font-medium">
              {{ product.name }}
            </p>
            <div class="text-sm border-t border-gray-300 pt-1 pb-1 border-b">
              <p class="flex items-center justify-between pt-1 pb-1">
                <span class="text-gray-700">Quantity:</span
                ><span class="text-black">{{ product.quantity }}</span>
              </p>
              <p class="flex items-center justify-between">
                <span class="text-gray-700">Price:</span
                ><span class="text-black text-sm">{{
                  product.price | currency
                }}</span>
              </p>
              <p class="flex items-center justify-between">
                <span class="text-gray-700">Total:</span
                ><span class="text-black">{{ product.total | currency }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between text-xl">
            <span class="font-medium">Total:</span>
            <span>{{ total | currency }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #content>
      <Content title="Checkout">
        <Button theme="secondary" @click="order">Place Order</Button>
      </Content>
    </template>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    };
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    total() {
      return this.$store.state.cart.total;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('user/initialize');
      const user = this.$store.state.user.user;
      this.formData = user || {};
    },
    async order() {
      const { message } = await this.$store.dispatch('post', {
        api: 'order',
      });
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$store.dispatch('cart/clear');
      this.$router.push('/');
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
  },
};
</script>
