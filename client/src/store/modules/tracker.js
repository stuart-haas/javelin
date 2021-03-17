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
  splice(state, { name, index }) {
    state[name].splice(index, 1);
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
  },
  async update({ dispatch }, { formData, param }) {
    await dispatch(
      'put',
      {
        api: 'tracker',
        formData,
        param,
      },
      { root: true }
    );
  },
  async remove({ dispatch, commit }, { param, index }) {
    await dispatch(
      'delete',
      {
        api: 'tracker',
        param,
      },
      { root: true }
    );
    commit('splice', { name: 'trackers', index });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
