import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import user from './modules/user';
import category from './modules/category';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    root,
    user,
    category,
  },
});

export default store;
