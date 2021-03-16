<template>
  <div class="container">
    <nav
      class="navbar is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-start">
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Search..." />
          </div>
          <div class="control">
            <a class="button is-info">Search</a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <Avatar v-if="user" :src="user && user.avatar" />
        <router-link v-else to="/login">Login</router-link>
      </div>
    </nav>
    <div class="container">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>
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
          label: 'Settings',
          icon: 'cog',
          tag: 'router-link',
          to: '/settings',
        },
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
  },
};
</script>
