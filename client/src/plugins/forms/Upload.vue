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
  </div>
</template>

<script>
export default {
  props: {
    field: Object,
  },
  data() {
    return {
      value: '',
      file: {},
    };
  },
  watch: {
    'field.value': function (newVal, oldVal) {
      this.value = newVal;
      this.$emit('change', { field: this.field, value: this.value });
    },
  },
  methods: {
    async submit() {
      const formData = new FormData();
      formData.append('file', this.file);
      const { file } = await this.$store.dispatch('post', {
        api: 'upload',
        formData,
      });
      const { path } = file;
      this.value = path;
      this.$emit('change', { field: this.field, value: this.value });
    },
    remove() {
      this.file = {};
      this.value = '';
      this.$emit('change', { field: this.field, value: '' });
    },
    change(e) {
      const file = e.target.files[0];
      this.file = file;
    },
  },
};
</script>
