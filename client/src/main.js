import Vue from 'vue';
import store from './store/store';
import router from './router';
import App from './App.vue';
import './plugins/buttons';
import './plugins/forms';
import './plugins/tables';
import './plugins/menus';
import './plugins/toast';
import './plugins/icons';
import './plugins/layouts';
import './plugins/api';
import './plugins/filters';
import './plugins/pagination';
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
