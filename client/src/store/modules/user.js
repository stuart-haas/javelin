import router from '../../router';

const state = () => {
  return {
    user: null,
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async login({ commit, dispatch }, { formData }) {
    const { success, user } = await dispatch(
      'post',
      { api: 'user/login', formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: user });
      router.push('/');
    }
  },
  async logout({ commit, dispatch }) {
    const { success } = await dispatch(
      'post',
      { api: 'user/logout' },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: null });
      router.push('/account/login');
    }
  },
  async register({ dispatch }, { formData }) {
    const { success } = await dispatch(
      'post',
      { api: 'user/register', formData },
      { root: true }
    );
    if (success) {
      router.push('/account/login');
    }
  },
  async addFavorite({ commit, dispatch }, { param, formData }) {
    console.log(param);
    const { success, user } = await dispatch(
      'post',
      { api: 'user/favorite', param, formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: user });
    }
  },
  async removeFavorite({ commit, dispatch }, { param, formData }) {
    const { success, user } = await dispatch(
      'put',
      { api: 'user/favorite', param, formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'user', value: user });
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
