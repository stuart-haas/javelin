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
  post(ctx, { api, formData }) {
    return this._vm.$api.post(api, formData).then(returnData);
  },
};

export default { state, getters, mutations, actions };
