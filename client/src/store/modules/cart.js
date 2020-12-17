const state = () => {
  return {
    cart: {
      items: [],
      total: 0,
      formattedTotal: '',
    },
    count: 0,
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async add({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'post',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      commit('setState', { name: 'cart', value: cart });
      commit('setState', { name: 'count', value: cart.items.length });
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
      commit('setState', { name: 'count', value: cart.items.length });
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
