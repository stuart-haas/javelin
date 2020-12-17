import Vue from 'vue';
import store from './store/store';
import router from './router';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faHeart,
  faToolbox,
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './plugins/api';
import './plugins/directives';
import './assets/css/index.css';

library.add(faShoppingCart, faHeart, faToolbox, faPlus, faMinus);

Vue.component('Icon', FontAwesomeIcon);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
