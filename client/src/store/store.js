import Vue from 'vue';
import Vuex from 'vuex';
import { state, getters, mutations, actions } from './root';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {

  }
});

export default store;