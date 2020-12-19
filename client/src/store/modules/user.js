import router from '../../router';

const state = () => {
  return {
    user: null,
    favorites: [],
  };
};

const getters = {
  user() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
  setStore(state, { name, value }) {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeStore(state, { name }) {
    localStorage.removeItem(name);
  },
  initialize(state) {
    if (localStorage.getItem('user')) {
      state.user = JSON.parse(localStorage.getItem('user'));
    }
  },
};

const actions = {
  async login({ commit, dispatch }, { api, formData }) {
    const { success, user } = await dispatch(
      'post',
      { api, formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: user });
      commit('setStore', { name: 'user', value: user });
      return success;
    }
  },
  async logout({ commit, dispatch }) {
    const { success, error } = await dispatch(
      'post',
      { api: 'user/logout' },
      { root: true }
    );
    if (success || error) {
      commit('setState', { name: 'user', value: null });
      commit('removeStore', { name: 'user' });
      commit('cart/setState', { name: 'items', value: [] }, { root: true });
      commit('cart/setState', { name: 'total', value: 0 }, { root: true });
      commit(
        'cart/setState',
        { name: 'formattedTotal', value: '' },
        { root: true }
      );
      router.push('/');
    }
  },
  async register({ dispatch }, { formData }) {
    const { success } = await dispatch(
      'post',
      { api: 'user/register', formData },
      { root: true }
    );
    if (success) {
      router.push('/login');
    }
  },
  async addFavorite({ commit, dispatch }, { param, formData }) {
    const { success, user } = await dispatch(
      'post',
      { api: 'user/favorite', param, formData },
      { root: true }
    );
    if (success) {
      const { favorites } = user;
      commit('setState', { name: 'user', value: user });
      commit('setState', { name: 'favorites', value: favorites });
    }
  },
  async removeFavorite({ commit, dispatch }, { param, formData }) {
    const { success, user } = await dispatch(
      'put',
      { api: 'user/favorite', param, formData },
      { root: true }
    );
    if (success) {
      const { favorites } = user;
      commit('setState', { name: 'user', value: user });
      commit('setState', { name: 'favorites', value: favorites });
    }
  },
  async favorites({ state, commit, dispatch }) {
    const param = state.user._id;
    if (!param) return;
    const { favorites } = await dispatch(
      'get',
      {
        api: 'user',
        param,
      },
      { root: true }
    );
    commit('setState', { name: 'favorites', value: favorites });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
