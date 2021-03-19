import router from '@/router';

const state = {
  user: null,
};

const getters = {};

const mutations = {
  set(state, { name, value }) {
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
      commit('set', { name: 'user', value: user });
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
      commit('set', { name: 'user', value: user });
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
      commit('set', { name: 'user', value: null });
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
};

export default { namespaced: true, state, getters, mutations, actions };
