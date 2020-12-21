<template>
  <fieldset class="mb-6" :class="field.class">
    <label :for="id" class="block text-sm font-medium text-gray-700">{{
      field.label
    }}</label>
    <input
      v-if="tag === 'input'"
      :type="type"
      :id="id"
      v-model="value"
      @input="input"
      class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent"
    />
    <textarea
      v-if="tag === 'textarea'"
      :id="id"
      class="mt-1 p-1 text-sm block w-full border-b border-gray-500 bg-transparent resize-none"
      v-model="value"
      @input="input"
    />
    <select
      v-if="tag === 'select'"
      :id="id"
      v-model="value"
      @change="input"
      class="mt-1 border-b border-gray-500 w-full cursor-pointer"
    >
      <option
        v-for="(item, index) in field.items"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
  </fieldset>
</template>

<script>
export default {
  props: {
    field: Object,
    index: Number,
  },
  data() {
    return {
      value: this.field.value,
    };
  },
  computed: {
    tag() {
      return this.field.tag || 'input';
    },
    type() {
      return this.tag === 'input' ? this.field.type || 'text' : '';
    },
    id() {
      return (
        this.$attrs.id ||
        this.field.id ||
        `${this.tag}${this.field.name}${this.type}`
      );
    },
  },
  watch: {
    'field.value': function (newVal, oldVal) {
      this.value = oldVal || newVal;
    },
  },
  methods: {
    input(e) {
      const { value } = e.target;
      this.value = value;

      const { field } = this;

      this.$emit('update', { field, value });
    },
  },
};
</script>
