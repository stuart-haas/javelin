<template>
  <form v-bind="$attrs" v-on="$listeners" @submit.prevent="submit">
    <Field
      v-for="(field, index) in fields"
      :key="field.label"
      :field="field"
      :index="index"
      @update="update"
    />
    <Button type="submit" theme="secondary">{{ submitLabel }}</Button>
    <transition name="fade">
      <div
        v-if="message.value"
        :class="`mt-3 text-center text-${message.type}`"
      >
        {{ message.value }}
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
      message: {
        type: '',
        value: '',
      },
      formData: {},
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
      const { dispatch, api, formData, param } = this;
      try {
        const response = await this.$store.dispatch(dispatch, {
          api,
          formData,
          param,
        });
        const { message } = response;
        this.message = { type: 'success', value: message };
        this.$emit('success', response);
      } catch (err) {
        const { error, message } = err.response.data;
        this.message = { type: 'error', value: message };
        this.$emit('error', { error, message, formData });
      }
    },
    update({ field, value }) {
      this.formData[field.name] = value;
    },
  },
};
</script>
