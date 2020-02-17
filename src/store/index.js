import Vue from "vue";
import { vuexfireMutations } from "vuexfire";
import Vuex from "vuex";

import user from "./user";
import shared from "./shared";
import feed from "./feed";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: vuexfireMutations,
  actions: {},
  modules: {
    user,
    shared,
    feed
  }
});
