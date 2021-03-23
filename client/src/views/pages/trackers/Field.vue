<template>
  <div class="field" :class="{ 'is-saved': saved }">
    <p class="control has-icons-right">
      <input
        type="text"
        class="input"
        :class="{ 'is-dirty': dirty }"
        :name="name"
        v-model="model"
        :placeholder="placeholder"
        @focus="handleFocus"
        @keydown.enter="handleSave"
        @blur="handleSave"
        @keyup.esc="handleCancel"
      />
      <span class="icon is-small is-right">
        <Icon icon="check" />
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    name: String,
    placeholder: String,
  },
  data() {
    return {
      model: '',
      dirty: false,
      saved: false,
    };
  },
  watch: {
    value: {
      handler: function (newVal, oldVal) {
        this.model = newVal;
      },
      immediate: true,
    },
    model: function (newVal, oldVal) {
      this.dirty = String(newVal) !== String(this.value);
    },
  },
  methods: {
    handleSave() {
      if (this.dirty) {
        const { name, model } = this;
        this.$emit('save', { name, model }, () => {
          this.dirty = false;
          this.saved = true;
          const timeout = setTimeout(() => {
            this.saved = false;
            clearTimeout(timeout);
          }, 3000);
        });
      }
    },
    handleCancel() {
      this.model = this.value;
    },
    handleFocus() {
      this.$emit('focus');
    },
  },
};
</script>

<style scoped>
.field .icon svg path {
  fill: transparent;
  transition: fill 0.3s ease;
}
.field.is-saved .icon svg path {
  fill: hsl(171, 100%, 41%);
}
.input {
  border-color: transparent;
  box-shadow: inset 0 0.0625em 0.125em transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}
.input:hover,
.input:focus {
  border-color: #dbdbdb;
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
}
.input.is-dirty {
  color: hsl(204, 86%, 53%);
}
</style>
