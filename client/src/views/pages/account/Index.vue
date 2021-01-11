<template>
  <Page>
    <template #sidebar>
      <Menu :items="items" />
    </template>
    <template #content>
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </template>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: 'Orders',
          to: '/account/orders',
        },
        {
          label: 'Favorites',
          to: '/account/favorites',
        },
        {
          label: 'Settings',
          to: '/account/settings',
        },
        {
          tag: 'Button',
          label: 'Logout',
          theme: 'danger',
          click: this.logout,
        },
      ],
    };
  },
  methods: {
    async logout() {
      const success = await this.$store.dispatch('user/logout');
      if (success) {
        this.$router.push('/');
      }
    },
  },
};
</script>
