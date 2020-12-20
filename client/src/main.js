import Vue from 'vue';
import store from './store/store';
import router from './router';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faStar,
  faToolbox,
  faPlus,
  faMinus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './plugins/forms';
import './plugins/button';
import './plugins/counter';
import './plugins/api';
import 'fontsource-libre-baskerville';
import 'fontsource-nunito';
import './assets/css/index.css';

library.add(faShoppingCart, faStar, faToolbox, faPlus, faMinus, faTimes);

Vue.component('Icon', FontAwesomeIcon);

new Vue({
  store,
  router,
  beforeCreate() {
    this.$store.dispatch('initialize');
  },
  render: (h) => h(App),
}).$mount('#app');
