<template>
  <div class="w-10/12 m-auto">
    <div class="grid grid-cols-12 gap-6 h-screen">
      <div class="col-span-3 border-r pt-8">
        <Menu :items="items" />
      </div>
      <div class="col-span-8 pt-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
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
