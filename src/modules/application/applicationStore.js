import call from "@/service/http";
import constants from "./applicationConstants";
import { EventBus } from "@/utils/eventBus";

export default {
  namespaced: true,
  state: {
    users: [],
    applications: [],
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
      call("get", constants.users)
        .then((res) => {
          commit("MUTATE", { state: "users", value: res.data.data });
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

    saveApplication: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.save, data)
        .then(() => {
          commit("SET_ALERT", {
            status: "success",
            message: "Success",
          });
          EventBus.$emit("routetoAll");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    getApplications: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", constants.applications)
        .then((res) => {
          commit("MUTATE", { state: "applications", value: res.data.data });
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
