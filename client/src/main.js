import Vue from 'vue';
import store from './store/store';
import router from './router';
import App from './App.vue';
import './assets/css/index.css';

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
