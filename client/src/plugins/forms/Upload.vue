<template>
  <div class="mb-6">
    <form
      v-if="!current && !path"
      @submit.prevent="submit"
      enctype="multipart/form-data"
    >
      <div class="space-y-3">
        <fieldset>
          <label for="image" class="block text-sm font-medium text-gray-700"
            >Image</label
          >
          <input
            id="image"
            name="image"
            type="file"
            class="mt-1 text-sm"
            @change="change"
          />
        </fieldset>
        <Button type="submit" theme="secondary">Upload</Button>
      </div>
    </form>
    <div v-else class="relative w-1/4">
      <div class="block text-sm font-medium text-gray-700">Image</div>
      <a
        :href="current || path"
        target="_blank"
        class="cursor-pointer border block p-4 border-gray-300 mt-3"
        ><img :src="current || path" class="h-auto w-full" />
      </a>
      <div
        class="absolute top-0 right-0 w-4 h-4 bg-gray-400 rounded-full p-3 text-center text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out"
        @click="remove"
      >
        <Icon icon="times" />
      </div>
    </div>
    <div
      v-if="message"
      class="my-3"
      :class="[message.success ? 'text-green-500' : 'text-red-500']"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: String,
  },
  data() {
    return {
      file: {},
      path: '',
      message: {
        success: true,
        text: '',
      },
    };
  },
  methods: {
    async submit() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        const { message, file } = await this.$store.dispatch('post', {
          api: 'upload',
          formData,
        });
        const path = `http://localhost:5000/${file.path}`;
        this.$emit('update', path);
        this.path = path;
        this.message = { success: true, text: message };
      } catch (error) {
        const { message } = error.response.data;
        this.message = { success: false, text: message };
      }
    },
    remove() {
      this.$emit('update', null);
      this.file = {};
      this.path = '';
      this.message = {};
    },
    change(e) {
      const file = e.target.files[0];
      this.file = file;
    },
  },
};
</script>
