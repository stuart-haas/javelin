<template>
  <form
    class="relative"
    v-bind="$attrs"
    v-on="$listeners"
    @submit.prevent="submit"
  >
    <Field
      v-for="(field, index) in fields"
      :key="field.label"
      :field="field"
      :index="index"
      @update="update"
    />
    <Button type="submit" theme="secondary">{{ submitLabel }}</Button>
    <slot></slot>
    <transition name="fade">
      <div
        v-if="messages.length"
        class="mt-3 absolute top-full w-full bg-white left-0 rounded shadow-lg px-4 py-2"
      >
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="`text-${message.type}`"
        >
          {{ message.value }}
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    fields: Array,
    append: Object,
    dispatch: {
      type: String,
      default: 'post',
    },
    api: {
      type: String,
      default: '',
    },
    param: {
      type: String,
      default: '',
    },
    submitLabel: {
      type: String,
      default: 'Submit',
    },
  },
  data() {
    return {
      messages: [],
      formData: {},
      messageDuration: 3000,
    };
  },
  watch: {
    fields: function (newVal, oldVal) {
      const data = newVal.reduce((obj, curr) => {
        obj[curr.name] = curr.value;

        return obj;
      }, {});
      this.formData = data;
    },
    append: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        const dataCopy = { ...newVal };
        this.formData = { ...this.formData, ...dataCopy };
      },
    },
  },
  methods: {
    async submit() {
      this.messages = [];
      const { dispatch, api, formData, param } = this;
      try {
        const response = await this.$store.dispatch(dispatch, {
          api,
          formData,
          param,
        });
        const { message } = response;
        this.messages = [{ type: 'success', value: message }];
        window.setTimeout(this.removeMessages, this.messageDuration);
        this.$emit('success', response);
      } catch (error) {
        let { message, errors } = error.response.data;
        if (errors) {
          const messages = errors.map((error) => {
            error.type = 'error';
            error.value = error.msg;
            return error;
          });
          this.messages = messages;
        }
        if (message) {
          this.messages = [{ type: 'error', value: message }];
        }
        window.setTimeout(this.removeMessages, this.messageDuration);
        this.$emit('error', { error, message, formData });
      }
    },
    removeMessages() {
      this.messages = [];
    },
    update({ field, value }) {
      this.formData[field.name] = value;
    },
  },
};
</script>
