<template>
  <div
    class="relative flex items-center justify-between border rounded-lg border-gray-300"
  >
    <button class="p-2 text-center cursor-pointer">
      <Icon icon="minus" class="text-sm text-gray-500" @click="decrease" />
    </button>
    <input
      type="text"
      v-model="count"
      @input="input"
      class="text-center border-r border-l border-gray-300 w-10 p-2"
    />
    <button class="p-2 text-center cursor-pointer">
      <Icon icon="plus" class="text-sm text-gray-500" @click="increase" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    min: Number,
    max: Number,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increase() {
      if (this.count < this.max) {
        this.count++;
      }
      this.emit();
    },
    decrease() {
      if (this.count > this.min) {
        this.count--;
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
      this.count = val;
      this.emit();
    },
    emit() {
      this.$emit('change', this.count);
    },
  },
};
</script>
