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
  set(state, { name, value }) {
    state[name] = value;
  },
  add(state, { name, value }) {
    state[name].push(value);
  },
  update(state, { name, param, value }) {
    const index = state[name].findIndex((item) => item._id === param);
    state[name].splice(index, 1, value);
  },
  remove(state, { name, param }) {
    state[name] = state[name].filter((item) => item._id !== param);
  },
};

const actions = {
  async fetch({ dispatch, commit }) {
    const trackers = await dispatch('get', { api: 'tracker' }, { root: true });
    commit('set', { name: 'trackers', value: trackers });
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
    commit('add', { name: 'trackers', value: tracker });
    return tracker;
  },
  async update({ dispatch, commit }, { formData, param }) {
    const { tracker } = await dispatch(
      'put',
      {
        api: 'tracker',
        formData,
        param,
      },
      { root: true }
    );
    commit('update', { name: 'trackers', param, value: tracker });
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
    commit('remove', { name: 'trackers', param });
    return tracker;
  },
};

export default { namespaced: true, state, getters, mutations, actions };
