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
