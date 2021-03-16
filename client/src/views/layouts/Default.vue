<template>
  <div class="h-full">
    <Header>
      <template #left>
        <div class="flex justify-between items-center">
        </div>
      </template>
      <template #right>
        <div class="flex justify-between items-center space-x-4">
          <Dropdown v-if="user" :items="menuItems">
            <template #title>
              <span class="flex justify-between items-center space-x-4">
                <Avatar :src="user && user.avatar" />
                <span>Your Account</span>
              </span>
            </template>
          </Dropdown>
          <router-link v-else to="/login" class="link">Login</router-link>
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
     menuItems() {
      return [
        {
          label: 'Logout',
          icon: 'sign-out-alt',
          action: () => {
            this.logout();
          },
        },
      ];
    },
  },
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/login');
      }
    },
  }
};
</script>
