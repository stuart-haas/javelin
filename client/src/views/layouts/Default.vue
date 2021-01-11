<template>
  <div class="h-full">
    <Header>
      <template #left>
        <div class="flex justify-between items-center">
          <router-link
            to="/products"
            active-class="text-secondary-500"
            class="link uppercase"
          >
            Products
          </router-link>
        </div>
      </template>
      <template #right>
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
    <transition name="page" mode="out-in">
      <router-view />
    </transition>
    <Sidebar title="Your Cart" />
    <Toast />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import Avatar from '@/components/Avatar.vue';

export default {
  components: {
    Sidebar,
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
