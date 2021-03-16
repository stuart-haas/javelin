<template>
  <div class="notifications">
    <transition-group name="slideUp">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="notification"
        :class="`${getType(toast)}`"
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
    getType(toast) {
      return toast.type === 'success' ? 'is-success' : 'is-danger';
    },
  },
};
</script>

<style scoped>
.notifications {
  position: fixed;
  right: 1em;
  bottom: 1em;
}
</style>
