import call from "@/service/http";
import constants from "./applicationConstants";

export default {
  namespaced: true,
  state: {
    users: [],
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
    appGetters: (state) => (val) => state[val],
  },
  actions: {
    getUsers: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", constants.bio)
        .then((res) => {
          commit("MUTATE", { state: "bio", value: res.data.data });
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

    saveApplication: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("patch", constants.save, data)
        .then(() => {
          dispatch("getBio");
          commit("SET_ALERT", {
            status: "success",
            message: "Success",
          });
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
