import { call } from "@/service";
import constants from "./landingConstants";

export default {
  namespaced: true,
  state: {
    company: {},
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.value;
    },

    SET_ALERT: (state, payload) => {
      state.alert = payload || {
        status: "",
        message: "",
      };
    },
  },
  getters: {
    landingGetters: (state) => (val) => state[val],
  },
  actions: {
    getCompanyInfo: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.company)
        .then((res) => {
          commit("MUTATE", { state: "company", value: res.data.data });
          commit("SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
  },
};
