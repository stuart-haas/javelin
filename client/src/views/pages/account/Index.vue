<template>
  <Page>
    <template v-slot:sidebar>
      <Menu :items="items" />
    </template>
    <template v-slot:content>
      <router-view />
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
          attrs: {
            to: '/account/orders',
          },
        },
        {
          label: 'Favorites',
          attrs: {
            to: '/account/favorites',
          },
        },
        {
          label: 'Settings',
          attrs: {
            to: '/account/settings',
          },
        },
        {
          tag: 'Button',
          label: 'Logout',
          attrs: {
            theme: 'danger',
          },
          listeners: {
            click: this.logout,
          },
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
