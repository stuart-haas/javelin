<template>
  <div class="w-full">
    <h2 class="h2">Settings</h2>
    <div class="mt-6">
      <Menu :items="items" direction="horizontal" />
      <div class="mt-10">
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
          label: 'Contact Information',
          attrs: {
            to: '/account/settings/user',
          },
        },
        {
          label: 'Shipping Address',
          attrs: {
            to: '/account/settings/shipping',
          },
        },
      ],
    };
  },
};
</script>
