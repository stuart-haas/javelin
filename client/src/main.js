import Vue from 'vue';
import store from './store/store';
import router from './router';
import App from './App.vue';
import './plugins/forms';
import './plugins/menus';
import './plugins/toast';
import './plugins/icons';
import './plugins/api';
import './plugins/filters';
import 'fontsource-libre-baskerville';
import 'fontsource-nunito';
import 'fontsource-nunito/600.css';
import 'fontsource-nunito/700.css';
import './assets/css/index.css';

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
