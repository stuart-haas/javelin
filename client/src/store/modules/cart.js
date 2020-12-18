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
    const { success, data } = await dispatch(
      'post',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      const { items, total, formattedTotal } = data;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
      commit('setState', { name: 'formattedTotal', value: formattedTotal });
    }
  },
  async remove({ commit, dispatch }, { formData }) {
    const { success, data } = await dispatch(
      'put',
      { api: 'cart', formData },
      { root: true }
    );
    if (success) {
      const { items, total, formattedTotal } = data;
      commit('setState', { name: 'items', value: items });
      commit('setState', { name: 'total', value: total });
      commit('setState', { name: 'formattedTotal', value: formattedTotal });
    }
  },
};

export default { namespaced: true, state, getters, mutations, actions };
