const state = () => {
  return {
    cart: {
      items: [],
      total: 0,
      formattedTotal: '',
    },
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async initialize({ dispatch }) {
    dispatch('get');
  },
  async get({ commit, dispatch }) {
    const cart = await dispatch('get', { api: 'cart' }, { root: true });
    if (cart) {
      commit('setState', { name: 'cart', value: cart });
    }
  },
  async add({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'post',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'cart', value: cart });
    }
  },
  async remove({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'put',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'cart', value: cart });
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
