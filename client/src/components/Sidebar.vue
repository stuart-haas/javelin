<template>
  <div class="relative">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed h-screen w-screen top-0 left-0 bg-black bg-opacity-50"
      ></div>
    </transition>
    <transition name="slideLeft">
      <div
        v-click-outside="close"
        v-if="open"
        style="transition-delay: 0.3s"
        class="fixed h-full top-0 right-0 bg-gray-100 w-1/4"
      >
        <div
          class="flex items-center justify-between border-b border-gray-300 p-4"
        >
          <div class="flex items-center">
            <Icon
              icon="times"
              class="text-gray-700 mr-3 cursor-pointer"
              @click="close"
            />
            <p class="text-xl">{{ title }}</p>
          </div>
          <div>{{ items.length }} {{ 'item' | pluralize(items.length) }}</div>
        </div>
        <div class="space-y-6 p-4">
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
                ><span class="text-black">{{ product.price | currency }}</span>
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
        <div class="px-4 text-center space-y-3 mt-3">
          <Button
            theme="secondary"
            tag="router-link"
            to="/cart/checkout"
            class="block"
            >Checkout</Button
          >
          <Button theme="primary" tag="router-link" to="/products" class="block"
            >Continue Shopping</Button
          >
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    total() {
      return this.$store.state.cart.total;
    },
    open() {
      return this.$store.state.root.sidebarOpen;
    },
  },
  methods: {
    close() {
      this.$store.commit('setState', { name: 'sidebarOpen', value: false });
    },
  },
};
</script>
