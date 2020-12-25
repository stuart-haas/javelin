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
          to: '/cp/orders',
        },
        {
          label: 'Products',
          icon: 'boxes',
          to: '/cp/products',
        },
        {
          label: 'Categories',
          icon: 'th',
          to: '/cp/categories',
        },
        {
          label: 'Users',
          icon: 'user',
          to: '/cp/users',
        },
      ],
    };
  },
};
</script>
