<template>
  <div class="mt-4 w-10/12 m-auto grid grid-cols-3 gap-6">
    <div v-for="product in products" :key="product._id" class="col-auto">
      <Card :product="product" />
    </div>
  </div>
</template>

<script>
import Card from '../../components/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const products = await this.$store.dispatch('get', { api: 'product' });
      this.products = products;
    },
  },
};
</script>
