<template>
  <div class="mb-20">
    <Header>
      <template v-slot:left>
        <div class="flex justify-between items-center">
          <router-link
            to="/products"
            active-class="text-blue-500"
            class="link uppercase"
          >
            Products
          </router-link>
        </div>
      </template>
      <template v-slot:right>
        <div class="flex justify-between items-center space-x-4">
          <router-link
            to="/cart"
            class="flex items-center relative cursor-pointer mr-8"
          >
            <Icon icon="toolbox" class="text-xl" />
            <div
              v-if="items.length"
              class="absolute top-full mt-0.5 w-2 h-2 bg-green-500 rounded-full transform left-1/2 -translate-x-1/2"
            ></div>
          </router-link>
          <Avatar :src="user && user.avatar" />
          <router-link v-if="!user" to="/login" class="link">Login</router-link>
          <router-link v-else to="/account" class="link"
            >My Account</router-link
          >
        </div>
      </template>
    </Header>
    <router-view />
    <Toast />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Avatar from '@/components/Avatar.vue';

export default {
  components: {
    Header,
    Avatar,
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
