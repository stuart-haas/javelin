import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import user from './modules/user';
import tracker from './modules/tracker';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    root,
    user,
    tracker,
  },
});

export default store;
