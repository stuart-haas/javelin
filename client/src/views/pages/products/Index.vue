<template>
  <div
    class="mt-10 w-10/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"
  >
    <div
      v-for="(product, index) in products"
      :key="product._id"
      class="col-auto"
    >
      <Card :product="product" :index="index" />
    </div>
  </div>
</template>

<script>
import Card from '../../../components/Card.vue';

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
      if (products) {
        this.products = products;
      }
    },
  },
};
</script>
