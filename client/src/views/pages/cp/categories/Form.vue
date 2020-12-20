<template>
  <div class="w-10/12">
    <div class="text-right mb-6">
      <Button
        v-if="$route.params.id"
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
        const category = await this.$store.dispatch('get', {
          api: 'category',
          param,
        });
        this.formData = category || {};
      }
    },
    async submit() {
      const { formData } = this;
      const param = this.$route.params.id;
      if (param) {
        const { category } = await this.$store.dispatch('put', {
          api: 'category',
          formData,
          param,
        });
        if (category) {
          this.message = 'Category updated';
        }
      } else {
        const { category } = await this.$store.dispatch('post', {
          api: 'category',
          formData,
        });
        if (category) {
          this.message = 'Category created';
        }
      }
    },
    async deleteThis() {
      if (!window.confirm('Are you sure?')) return;
      const param = this.$route.params.id;
      const { category } = await this.$store.dispatch('delete', {
        api: 'category',
        param,
      });
      if (category) {
        this.$router.push('/cp/categories');
      }
    },
    input(e) {
      const { name, value } = e.target;
      this.formData[name] = value;
    },
  },
};
</script>
