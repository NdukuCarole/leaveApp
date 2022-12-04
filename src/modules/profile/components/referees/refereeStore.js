import call from "../../../../service/http";
import constants from "./refereeConstants";
import { EventBus } from "@/utils/eventBus";

export default {
  state: {
    referees: [],
    singleReferee: {},
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
    refereeGetters: (state) => (val) => state[val],
  },
  actions: {
    getReferee: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", constants.referee)
        .then((res) => {
          commit("MUTATE", { state: "referees", value: res.data.data });
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

    saveReferee: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.referee, data)
        .then(() => {
          dispatch("getReferee");
          EventBus.$emit("redirectToReferee");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    editReferee: ({ commit, dispatch }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("patch", constants.referee, data)
        .then(() => {
          dispatch("getReferee");
          commit("SET_ALERT", {
            status: "success",
            message: "Successfully Edited Referee",
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
    deleteReferee: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.delReferee, data)
        .then(() => {
          dispatch("getReferee");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    getOneReferee({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("get", constants.SINGLE(payload))
        .then((res) => {
          commit("MUTATE", { state: "singleReferee", value: res.data.data[0] });
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
