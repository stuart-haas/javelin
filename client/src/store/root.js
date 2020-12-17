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
  get(ctx, { api, param = '' }) {
    return this._vm.$api.get(`${api}/${param}`).then(returnData);
  },
  post(ctx, { api, formData }) {
    return this._vm.$api.post(api, formData).then(returnData);
  },
  put(ctx, { api, formData }) {
    return this._vm.$api.put(api, formData).then(returnData);
  },
};

export default { state, getters, mutations, actions };
