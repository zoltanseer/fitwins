import * as types from "@/store/types";

const state = {
  loading: false,
  error: null
};

const mutations = {
  [types.SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },

  [types.SET_ERROR]: (state, payload) => {
    state.error = payload;
  },

  [types.RESET_ERROR]: state => (state.error = null)
};

const actions = {
  [types.CLEAR_ERROR]: ({ commit }) => {
    commit(types.RESET_ERROR);
  },

  [types.SET_ERROR_MSG]: ({ commit }, payload) => {
    commit(types.SET_ERROR, payload);
  }
};

const getters = {
  [types.LOADING]: state => state.loading,
  [types.ERROR]: state => state.error
};

export default {
  state,
  mutations,
  actions,
  getters
};
