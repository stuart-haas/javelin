<template>
  <Content title="Settings">
    <Menu :items="items" direction="horizontal" />
    <div class="mt-12 w-8/12">
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </div>
  </Content>
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
