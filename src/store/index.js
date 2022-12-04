import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
  },

  getters: {
    loading: (state) => state.loading,
  },
});
