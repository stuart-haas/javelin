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
      router.push('/login');
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
};

export default { namespaced: true, state, getters, mutations, actions };
