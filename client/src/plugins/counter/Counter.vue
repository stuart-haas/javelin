<template>
  <div
    v-bind="$attrs"
    class="relative flex items-center justify-between border rounded border-gray-300"
  >
    <button
      :disabled="value === min"
      class="p-2 text-center cursor-pointer bg-transparent hover:bg-gray-100 rounded-l transition duration-300"
      @click="decrease"
    >
      <Icon icon="minus" class="text-sm text-gray-500" />
    </button>
    <input
      type="text"
      v-model="value"
      @input="input"
      class="text-center border-r border-l border-gray-300 w-10 p-2"
    />
    <button
      :disabled="value === max"
      class="p-2 text-center cursor-pointer bg-transparent hover:bg-gray-100 rounded-r transition duration-300"
      @click="increase"
    >
      <Icon icon="plus" class="text-sm text-gray-500" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
    current: Number,
  },
  data() {
    return {
      value: this.current,
    };
  },
  watch: {
    current: function (newVal) {
      this.value = newVal;
    },
  },
  methods: {
    increase() {
      if (this.value < this.max) {
        this.value++;
      }
      this.emit();
    },
    decrease() {
      if (this.value > this.min) {
        this.value--;
      }
      this.emit();
    },
    input(e) {
      const { value } = e.target;
      if (!value) return;
      let val = parseInt(value);
      if (!isNaN(val)) {
        if (Math.sign(val) === -1) {
          val = this.min;
        }
        if (val > this.max) {
          val = this.max;
        }
      } else {
        val = this.min;
      }
      this.value = val;
      this.emit();
    },
    emit() {
      this.$emit('change', this.value);
    },
  },
};
</script>
