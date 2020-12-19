const returnData = ({ data }) => data;

const state = () => {
  return {};
};

const getters = {};

const mutations = {
  setState(state, { value, name }) {
    state[name] = value;
  },
};

const actions = {
  initialize({ commit, dispatch }) {
    dispatch('cart/initialize');
    commit('user/initialize');
  },
  get(ctx, { api, param }) {
    const route = param ? `${api}/${param}` : api;
    return this._vm.$api.get(route).then(returnData);
  },
  post(ctx, { api, param, formData }) {
    const route = param ? `${api}/${param}` : api;
    return this._vm.$api.post(route, formData).then(returnData);
  },
  put(ctx, { api, param, formData }) {
    const route = param ? `${api}/${param}` : api;
    return this._vm.$api.put(route, formData).then(returnData);
  },
};

export default { state, getters, mutations, actions };
