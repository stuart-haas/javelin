const returnData = ({ data }) => data;

const state = () => {
  return {
    sidebarOpen: false,
  };
};

const getters = {};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
};

const actions = {
  initialize({ dispatch }) {
    dispatch('cart/initialize');
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
  delete(ctx, { api, param }) {
    const route = param ? `${api}/${param}` : api;
    return this._vm.$api.delete(route).then(returnData);
  },
  toast(ctx, { options }) {
    this._vm.$toast(options);
  },
};

export default { state, getters, mutations, actions };
