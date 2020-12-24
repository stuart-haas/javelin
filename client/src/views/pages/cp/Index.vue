<template>
  <Page>
    <template v-slot:sidebar>
      <Menu :items="items" direction="vertical" />
    </template>
    <template v-slot:content>
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
          icon: 'shopping-cart',
          attrs: {
            to: '/cp/orders',
          },
        },
        {
          label: 'Products',
          icon: 'boxes',
          attrs: {
            to: '/cp/products',
          },
        },
        {
          label: 'Categories',
          icon: 'th',
          attrs: {
            to: '/cp/categories',
          },
        },
        {
          label: 'Users',
          icon: 'user',
          attrs: {
            to: '/cp/users',
          },
        },
      ],
    };
  },
};
</script>
