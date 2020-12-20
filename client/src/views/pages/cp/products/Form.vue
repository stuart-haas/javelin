<template>
  <div class="w-10/12">
    <Upload :current="formData.image" @update="update" />
    <form @submit.prevent="submit">
      <div class="space-y-6">
        <fieldset>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            name="name"
            id="name"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['name']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >SKU</label
          >
          <input
            type="text"
            name="sku"
            id="sku"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['sku']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="price" class="block text-sm font-medium text-gray-700"
            >Price</label
          >
          <input
            type="text"
            name="price"
            id="price"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['price']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="inventory" class="block text-sm font-medium text-gray-700"
            >Inventory</label
          >
          <input
            type="text"
            name="inventory"
            id="inventory"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            v-model="formData['inventory']"
            @input="input"
          />
        </fieldset>
        <fieldset>
          <label for="category" class="block text-sm font-medium text-gray-700"
            >Category</label
          >
          <select
            id="category"
            name="category"
            v-model="formData['category']"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
            @change="input"
          >
            <option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </fieldset>
        <fieldset>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            name="description"
            id="description"
            class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent resize-none"
            v-model="formData['description']"
            @input="input"
          />
        </fieldset>
        <div class="text-center">
          <Button type="submit" theme="secondary" class="block w-full">
            Save
          </Button>
        </div>
        <div v-if="message" class="text-center text-green-500">
          {{ message }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      categories: [],
      message: '',
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const param = this.$route.params.id;
      if (param) {
        const product = await this.$store.dispatch('get', {
          api: 'product',
          param,
        });
        this.formData = product || {};
      }

      const categories = await this.$store.dispatch('get', {
        api: 'category',
      });
      this.categories = categories;
      this.formData['category'] = this.categories[0]._id;
    },
    async submit() {
      const { formData } = this;
      const param = this.$route.params.id;
      if (param) {
        const { product } = await this.$store.dispatch('put', {
          api: 'product',
          formData,
          param,
        });
        if (product) {
          this.message = 'Product updated';
        }
      } else {
        const { product } = await this.$store.dispatch('post', {
          api: 'product',
          formData,
        });
        if (product) {
          this.message = 'Product created';
        }
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
    update(path) {
      this.formData['image'] = path;
    },
  },
};
</script>
