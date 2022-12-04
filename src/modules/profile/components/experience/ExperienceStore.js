import call from "../../../../service/http";
import experienceConstants from "./ExperienceConstants";
import { EventBus } from "@/utils/eventBus";

export default {
  state: {
    experience: [],
    singleExp: {},
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
    experienceGetters: (state) => (val) => state[val],
  },
  actions: {
    getExperience: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", experienceConstants.experience)
        .then((res) => {
          commit("MUTATE", { state: "experience", value: res.data.data });
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

    saveExperience: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", experienceConstants.experience, data)
        .then(() => {
          dispatch("getExperience");
          EventBus.$emit("redirectToExperience");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    editExperience: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("patch", experienceConstants.experience, data)
        .then(() => {
          dispatch("getExperience");
          commit("SET_ALERT", {
            status: "success",
            message: "Successfully Edited Experience",
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
    deleteExperience: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", experienceConstants.delExperience, data)
        .then(() => {
          dispatch("getExperience");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    getSingleExp({ commit }, payload) {
      console.log(payload);
      commit("SET_LOADING", true, { root: true });
      call("get", experienceConstants.SINGLEEXP(payload))
        .then((res) => {
          commit("MUTATE", { state: "singleExp", value: res.data.data[0] });
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
