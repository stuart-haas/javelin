<template>
  <div class="fixed bottom-0 right-4">
    <transition-group name="list">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="list p-2 mb-4 shadow-lg bg-danger-base text-white transition-all duration-500"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import instance from '@/plugins/toast/instance';

export default {
  data() {
    return {
      toasts: [],
      timers: [],
    };
  },
  mounted() {
    instance.$on('toast', this.toast);
  },
  methods: {
    add(options) {
      this.toasts.push(options);
      this.timers.push(this.setTimer(options));
    },
    remove(id) {
      const index = this.toasts.findIndex((toast) => toast.id === id);

      if (!index !== -1) {
        this.toasts.splice(index, 1);
        this.timers.splice(index, 1);
      }
    },
    setTimer(options) {
      return window.setTimeout(this.remove, options.duration, options.id);
    },
    toast(options) {
      const id = Date.now();
      this.add({ ...options, id });
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
</style>
