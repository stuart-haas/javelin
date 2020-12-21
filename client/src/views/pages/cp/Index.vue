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
          label: 'Products',
          attrs: {
            to: '/cp/products',
          },
        },
        {
          label: 'Categories',
          attrs: {
            to: '/cp/categories',
          },
        },
        {
          label: 'Users',
          attrs: {
            to: '/cp/users',
          },
        },
      ],
    };
  },
};
</script>
