const state = () => {
  return {
    items: [],
    total: 0,
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
    const { items, total } = await dispatch(
      'get',
      { api: 'cart' },
      { root: true }
    );
    if (items) {
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
    }
  },
  async add({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'post',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      const { items, total } = cart;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
    }
    return success;
  },
  async remove({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'put',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      const { items, total } = cart;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
    }
  },
  clear({ commit }) {
    commit('setState', { name: 'items', value: [] });
    commit('setState', { name: 'total', value: 0 });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
