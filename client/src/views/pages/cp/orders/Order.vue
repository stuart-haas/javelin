<template>
  <Content>
    <template v-slot:header>
      <div>
        <p class="text-2xl text-gray-700 font-semibold">{{ order.orderId }}</p>
        <p v-if="order.createdAt" class="text-gray-700 mt-2">
          {{ order.createdAt | date }} at {{ order.createdAt | time }}
        </p>
      </div>
      <Button v-if="id" class="mt-3" theme="danger" @click="deleteThis">
        Delete
      </Button>
    </template>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8 space-y-6">
        <Panel title="Order Items">
          <div class="space-y-4 divide-y mt-3">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="grid grid-cols-12 gap-6"
            >
              <div class="col-span-8 flex flex items-center py-1">
                <div
                  class="w-16 h-16 bg-no-repeat bg-center bg-contain mr-4"
                  :style="{
                    'background-image': `url(${item.product.image})`,
                  }"
                ></div>
                <div>
                  <router-link
                    class="block text-secondary-500"
                    :to="`/cp/products/${item.product._id}`"
                    >{{ item.product.name }}</router-link
                  >
                  <p class="text-sm">SKU: {{ item.product.sku }}</p>
                </div>
              </div>
              <div class="col-span-2 flex items-center justify-between">
                <div>{{ item.price | currency }}</div>
                <div class="">x</div>
                <div>{{ item.quantity }}</div>
              </div>
              <div class="col-span-2 flex items-center justify-between">
                <div class="w-full text-right">{{ item.total | currency }}</div>
              </div>
            </div>
          </div>
        </Panel>
        <Panel title="Order Summary">
          <div class="grid grid-cols-12 gap-6 mt-6">
            <div class="col-span-8 text-gray-500 space-y-4">
              <div>Shipping Provider</div>
              <div>Shipping Option</div>
              <div>Subtotal</div>
              <div>Shipping</div>
              <div class="text-black font-bold">Total</div>
            </div>
            <div class="col-span-4 text-right space-y-4">
              <div>{{ order.shippingProvider }}</div>
              <div>{{ order.shippingOption }}</div>
              <div>{{ order.subtotal | currency }}</div>
              <div>{{ order.shipping | currency }}</div>
              <div class="text-black font-bold">
                {{ order.total | currency }}
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <div class="col-span-4 space-y-6">
        <Panel v-if="order.user" title="Customer Details">
          <div class="mt-6 space-y-4">
            <img
              :src="order.user.avatar"
              class="rounded-full w-16 h-auto align-middle"
            />
            <div>{{ order.user.firstName }} {{ order.user.lastNae }}</div>
            <div>{{ order.user.street }}</div>
            <div>
              {{ order.user.city }}, {{ order.user.state }}
              {{ order.user.zipCode }}
            </div>
            <div>{{ order.user.email }}</div>
          </div>
        </Panel>
        <Panel>
          <div class="flex justify-between">
            <div class="font-bold text-xl">Note</div>
            <div class="text-secondary-500 font-bold">Edit</div>
          </div>
        </Panel>
      </div>
    </div>
  </Content>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      user: {},
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    items() {
      return this.order.items;
    },
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const order = await this.$store.dispatch('get', {
          api: 'order/cp',
          param,
        });
        this.order = order;
      }

      await this.$store.dispatch('user/initialize');
      const user = this.$store.state.user.user;
      this.user = user;
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { order, message } = await this.$store.dispatch('delete', {
        api: 'order/cp',
        param,
      });
      if (order) {
        this.$toast({ type: 'success', message, duration: 2000 });
        this.$router.push('/cp/orders');
      }
    },
    success(response) {
      const { message } = response;
      this.$toast({ type: 'success', message, duration: 2000 });
      this.$router.push('/cp/orders');
    },
  },
};
</script>
