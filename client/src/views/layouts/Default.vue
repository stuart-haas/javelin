<template>
  <div>
    <nav
      class="navbar is-light is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-start">
        <h1 class="is-size-3">JAVELIN</h1>
      </div>
      <div class="navbar-end">
        <Dropdown :items="menuItems" v-if="user">
          <template #trigger>
            <Avatar
              v-if="user"
              :src="user && user.avatar"
              class="is-clickable"
            />
          </template>
        </Dropdown>
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
import Avatar from '@/components/Avatar.vue';

export default {
  components: {
    Avatar,
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    menuItems() {
      return [
        {
          label: this.user.username,
        },
        {
          label: this.user.email,
          class: 'has-text-grey-light is-size-7',
        },
        {
          divider: true,
        },
        {
          label: 'Settings',
          icon: 'cog',
          tag: 'router-link',
          to: '/settings',
        },
        {
          label: 'Logout',
          class: 'is-clickable',
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
