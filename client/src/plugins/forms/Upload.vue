<template>
  <div class="mb-6">
    <form v-if="!value" @submit.prevent="submit" enctype="multipart/form-data">
      <div class="space-y-3">
        <fieldset>
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
    <div v-else class="relative w-1/3">
      <a
        :href="value"
        target="_blank"
        class="cursor-pointer border block p-4 border-gray-300 mt-3"
        ><img :src="value" class="h-auto w-full" />
      </a>
      <CloseButton class="absolute top-1 right-1" @click="remove" />
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
    field: Object,
  },
  data() {
    return {
      file: {},
      value: '',
      message: {
        success: true,
        text: '',
      },
    };
  },
  watch: {
    'field.value': function (newVal, oldVal) {
      this.value = newVal;
    },
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
        const value = `http://localhost:5000/${file.path}`;
        const field = this.field;
        this.$emit('change', { field, value });
        this.value = value;
        this.message = { success: true, text: message };
      } catch (error) {
        const { message } = error.response.data;
        this.message = { success: false, text: message };
      }
    },
    remove() {
      this.$emit('change', null);
      this.file = {};
      this.value = '';
      this.message = {};
    },
    change(e) {
      const file = e.target.files[0];
      this.file = file;
    },
  },
};
</script>
