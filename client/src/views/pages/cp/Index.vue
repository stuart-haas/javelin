<template>
  <Page>
    <template v-slot:header>
      <Menu :items="items" direction="horizontal" />
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
          attrs: {
            to: '/cp/orders',
          },
        },
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
