import router from '@/router';

const state = () => {
  return {
    user: null,
    favorites: [],
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async initialize({ dispatch, commit }) {
    const { user } = await dispatch(
      'get',
      {
        api: 'user/session',
      },
      { root: true }
    );
    if (user) {
      commit('setState', { name: 'user', value: user });
      if (router.history.current.name === 'login') {
        const { from } = router.history.current.query;
        if (from) {
          router.push(from);
        } else {
          router.push('/');
        }
      }
    }
  },
  async login({ commit, dispatch }, { api, formData }) {
    const { success, user } = await dispatch(
      'post',
      { api, formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: user });
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
      commit('cart/setState', { name: 'items', value: [] }, { root: true });
      commit('cart/setState', { name: 'total', value: 0 }, { root: true });
      commit(
        'cart/setState',
        { name: 'formattedTotal', value: '' },
        { root: true }
      );
    }
    return success;
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
