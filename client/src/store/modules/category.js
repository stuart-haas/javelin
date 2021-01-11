const state = () => {
  return {
    categories: [],
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async send({ dispatch }, { method, options }) {
    return await dispatch(method, options, { root: true });
  },
  async fetch({ dispatch, commit }) {
    const products = await dispatch('send', {
      method: 'get',
      options: { api: 'category' },
    });
    commit('setState', { name: 'categories', value: products });
  },
  async batch({ dispatch }, { action, formData }) {
    const { message } = await dispatch('send', {
      method: 'put',
      options: { api: `category/batch/${action}`, formData },
    });
    dispatch('fetch');
    return message;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
