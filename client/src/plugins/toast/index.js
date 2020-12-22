import Vue from 'vue';
import Toast from './Toast.vue';
import instance from './instance';

const $toast = (options) => {
  instance.$emit('toast', options);
};

const ToastPlugin = {
  install(Vue, options = {}) {
    Vue.component('Toast', Toast);
    Vue.prototype.$toast = $toast;
  },
};

Vue.use(ToastPlugin);
