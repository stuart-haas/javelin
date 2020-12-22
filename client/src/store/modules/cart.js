const state = () => {
  return {
    items: [],
    total: 0,
    formattedTotal: '',
  };
};

const getters = {
  items(state) {
    return state.items;
  },
  formattedTotal(state) {
    return state.formattedTotal;
  },
};

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
    const { items, total, formattedTotal } = await dispatch(
      'get',
      { api: 'cart' },
      { root: true }
    );
    if (items) {
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
      commit('setState', { name: 'formattedTotal', value: formattedTotal });
    }
  },
  async add({ commit, dispatch }, { formData }) {
    const { success, cart } = await dispatch(
      'post',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      const { items, total, formattedTotal } = cart;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
      commit('setState', { name: 'formattedTotal', value: formattedTotal });
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
      const { items, total, formattedTotal } = cart;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
      commit('setState', { name: 'formattedTotal', value: formattedTotal });
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
