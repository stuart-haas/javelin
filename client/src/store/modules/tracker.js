const state = {
  trackers: [],
};

const getters = {
  progress(state) {
    return state.trackers.filter((item) => !item.complete);
  },
  complete(state) {
    return state.trackers.filter((item) => item.complete);
  },
};

const mutations = {
  setState(state, { name, value }) {
    state[name] = value;
  },
  push(state, { name, value }) {
    state[name].push(value);
  },
  splice(state, { name, param }) {
    state[name] = state[name].filter((item) => item._id !== param);
  },
};

const actions = {
  async fetch({ dispatch, commit }) {
    const trackers = await dispatch('get', { api: 'tracker' }, { root: true });
    commit('setState', { name: 'trackers', value: trackers });
  },
  async add({ dispatch, commit }, { formData }) {
    const { tracker } = await dispatch(
      'post',
      {
        api: 'tracker',
        formData,
      },
      { root: true }
    );
    commit('push', { name: 'trackers', value: tracker });
    return tracker;
  },
  async update({ dispatch }, { formData, param }) {
    const { tracker } = await dispatch(
      'put',
      {
        api: 'tracker',
        formData,
        param,
      },
      { root: true }
    );
    return tracker;
  },
  async remove({ dispatch, commit }, { param }) {
    const { tracker } = dispatch(
      'delete',
      {
        api: 'tracker',
        param,
      },
      { root: true }
    );
    commit('splice', { name: 'trackers', param });
    return tracker;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
