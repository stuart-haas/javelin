const state = () => {
  return {
    products: [],
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  async fetch({ dispatch, commit }) {
    const products = await dispatch(
      'get',
      {
        api: 'product',
      },
      { root: true }
    );
    commit('setState', { name: 'products', value: products });
  },
  async batch({ dispatch }, { action, formData }) {
    const { message } = await dispatch(
      'put',
      {
        api: `product/batch/${action}`,
        formData,
      },
      { root: true }
    );
    dispatch('fetch');
    return message;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
