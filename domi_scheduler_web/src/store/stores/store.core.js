const state = {
    schedulerView: 'Mes',
};

const getters = {
    getView: (state) => (
        state.schedulerView
    ),
}

const mutations = {
  setSchedulerView: (state, view) => {
    state.schedulerView = view;
  }
};

const actions = {
    async fetchChangeSchedulerView({commit}, view) {
        commit('setSchedulerView', view);
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
