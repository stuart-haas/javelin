<template>
  <div class="h-full">
    <Header>
      <template v-slot:left>
        <div class="flex items-center justify-between">
          <router-link to="/" class="link"
            ><Icon icon="home" class="text-xl"
          /></router-link>
        </div>
      </template>
      <template v-slot:right>
        <div class="flex items-center justify-between">
          <div class="mr-10">
            <div class="flex items-center space-between space-x-4">
              <Avatar :src="user && user.avatar" />
              <div>{{ user && user.username }}</div>
            </div>
          </div>
          <Button type="submit" theme="danger" @click="logout"> Logout </Button>
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
    items() {
      return this.$store.state.cart.items;
    },
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/cp/login');
      }
    },
  },
};
</script>
