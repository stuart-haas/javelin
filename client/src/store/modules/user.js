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
    const { user } = await dispatch(
      'post',
      { api: 'user/login', formData },
      { root: true }
    );
    commit('setState', { name: 'user', value: user });
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
