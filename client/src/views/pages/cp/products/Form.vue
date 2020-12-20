<template>
  <div class="w-10/12">
    <div class="flex justify-between items-start">
      <Upload :current="formData.image" @update="updateImage" />
      <Button
        v-if="$route.params.id"
        class="mt-3"
        theme="red"
        :variant="{ base: '500', dark: '600' }"
        @click="deleteThis"
      >
        Delete
      </Button>
    </div>
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
          <input
            v-if="isAdding"
            v-model="category"
            class="block border border-gray-500 mt-2 p-1 text-sm"
            @input="inputCategory"
          />
          <span
            v-if="!isAdding"
            class="inline-block border border-gray-300 p-1 mt-2 text-sm bg-transparent hover:bg-gray-100 transition duration-300 cursor-pointer"
            @click="isAdding = true"
          >
            <Icon icon="plus" />
            <span class="ml-2">Add New</span>
          </span>
          <span
            v-if="category"
            class="inline-block py-1 px-2 mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white transition duration-300 cursor-pointer"
            @click="saveCategory"
          >
            <span>Save</span>
          </span>
          <div v-if="categoryMessage" class="text-green-500 text-sm mt-1">
            {{ categoryMessage }}
          </div>
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
      </div>
    </form>
    <div v-if="message" class="text-center text-green-500 mt-6">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      categories: [],
      isAdding: false,
      category: '',
      categoryMessage: '',
      message: '',
    };
  },
  mounted() {
    this.fetchProduct();
    this.fetchCategories();
  },
  methods: {
    async fetchProduct() {
      const param = this.$route.params.id;
      if (param) {
        const product = await this.$store.dispatch('get', {
          api: 'product',
          param,
        });
        this.formData = product || {};
      }
    },
    async fetchCategories() {
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
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { product } = await this.$store.dispatch('delete', {
        api: 'product',
        param,
      });
      if (product) {
        this.$router.push('/cp/products');
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
    updateImage(path) {
      this.formData['image'] = path;
    },
    inputCategory(e) {
      const { value } = e.target;
      this.category = value;
    },
    async saveCategory() {
      const formData = { name: this.category };
      const { category } = await this.$store.dispatch('post', {
        api: 'category',
        formData,
      });
      if (category) {
        this.fetchCategories();
        this.isAdding = false;
        this.category = '';
        this.categoryMessage = 'Category created';
      }
    },
  },
};
</script>
