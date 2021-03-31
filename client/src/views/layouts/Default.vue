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
    <div class="columns">
      <div class="column is-one-fifth">
        <div class="section">
          <aside class="menu">
            <p class="menu-label">
              Routine
            </p>
            <ul class="menu-list">
              <li><a class="is-active">Trackers</a></li>
              <li><a>Tasks</a></li>
              <li><a>Estimates</a></li>
            </ul>
            <p class="menu-label">
              Explore
            </p>
            <ul class="menu-list">
              <li><a>Dashboard</a></li>
              <li><a>Reports</a></li>
            </ul>
            <p class="menu-label">
              Maintain
            </p>
            <ul class="menu-list">
              <li><a>Clients</a></li>
              <li><a>Projects</a></li>
            </ul>
            <p class="menu-label">
              Settings
            </p>
            <ul class="menu-list">
              <li><a>General</a></li>
              <li><a>Export</a></li>
              <li><a>Import</a></li>
              <li><a>Integrations</a></li>
            </ul>
          </aside>
        </div>
      </div>
      <div class="column">
        <div class="container">
          <transition name="page" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
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
