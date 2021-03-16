<template>
  <div class="h-full">
    <Header>
      <template #left>
        <div class="flex justify-between items-center">
        </div>
      </template>
      <template #right>
        <div class="flex justify-between items-center space-x-4">
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
    user() {
      return this.$store.state.user.user;
    },
  },
};
</script>
