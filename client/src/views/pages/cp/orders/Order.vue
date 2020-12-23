<template>
  <Content>
    <template v-slot:header>
      <div>
        <h1 class="h2 text-gray-600">{{ order.orderId }}</h1>
        <p v-if="order.createdAt" class="text-gray-600 mt-2">
          {{ order.createdAt | date }} at {{ order.createdAt | time }}
        </p>
      </div>
      <Button v-if="id" class="mt-3" theme="danger" @click="deleteThis">
        Delete
      </Button>
    </template>
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-8">
        <Pane>
          <p class="text-xl font-medium border-b border-gray-300 pb-2">
            Order Details
          </p>
          <div class="space-y-4 mt-3">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="grid grid-cols-12 gap-6"
            >
              <div class="col-span-8 flex flex items-center">
                <div
                  class="w-16 h-16 bg-no-repeat bg-center bg-contain mr-4"
                  :style="{
                    'background-image': `url(${item.product.image})`,
                  }"
                ></div>
                <div>
                  <router-link
                    class="block text-blue-500"
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
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-8">
                <textarea
                  class="w-full border border-gray-300 resize-none rounded p-1"
                  rows="1"
                  placeholder="Note"
                />
              </div>
              <div class="col-span-2 text-gray-500 space-y-4">
                <div>Subtotal</div>
                <div>Shipping</div>
                <div class="text-black font-bold">Total</div>
              </div>
              <div class="col-span-2 text-right space-y-4">
                <div>{{ order.subtotal | currency }}</div>
                <div>{{ order.shipping | currency }}</div>
                <div class="text-black font-bold">
                  {{ order.total | currency }}
                </div>
              </div>
            </div>
          </div>
        </Pane>
      </div>
      <div class="col-span-4">
        <Pane>
          <p class="text-xl font-medium border-b border-gray-300 pb-2">
            Customer Details
          </p>
        </Pane>
      </div>
    </div>
  </Content>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      order: {},
      user: {},
      formFields: [
        {
          label: 'Date',
          name: 'createdAt',
          disabled: true,
          format: {
            function: format,
            pattern: 'MMMM d, yyyy h:mm:ss a',
          },
        },
        {
          label: 'Order Id',
          name: 'orderId',
          disabled: true,
        },
        {
          label: 'First Name',
          name: 'user.firstName',
          disabled: true,
        },
        {
          label: 'Last Name',
          name: 'user.lastName',
          disabled: true,
        },
        {
          label: 'Email',
          name: 'user.email',
          disabled: true,
        },
      ],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    fields() {
      return this.mapFieldData(this.order, this.formFields);
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
