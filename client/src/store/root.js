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
  send(ctx, { method, api, id, params, formData }) {
    const route = id ? `${api}/${id}` : api;
    const data = formData || { params: params };

    return this._vm.$api[method](route, data).then(returnData);
  },
  get({ dispatch }, options) {
    options.method = 'get';
    return dispatch('send', options);
  },
  post({ dispatch }, options) {
    options.method = 'post';
    return dispatch('send', options);
  },
  put({ dispatch }, options) {
    options.method = 'put';
    return dispatch('send', options);
  },
  delete({ dispatch }, options) {
    options.method = 'delete';
    return dispatch('send', options);
  },
  toast(ctx, { options }) {
    this._vm.$toast(options);
  },
  confirmable({ dispatch }, { api, data }) {
    if (window.confirm('Are you sure?')) {
      return dispatch(api, data);
    }
  },
};

export default { state, getters, mutations, actions };
