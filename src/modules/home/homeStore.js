import constants from "./homeConstants";
import { call } from "@/service";
import { EventBus } from "@/utils/eventBus";

export default {
  namespaced: true,
  state: {
    jobs: [],
    singleJob: {},
    categories: [],
    applications: [],
    singleApplication: {},
    alert: {
      status: "",
      message: "",
    },
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
    homeGetters: (state) => (val) => state[val],
  },
  actions: {
    getJobs: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.jobs)
        .then((res) => {
          commit("MUTATE", { state: "jobs", value: res.data.data });
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

    getCategories: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.categories)
        .then((res) => {
          // commit("SET_CATEGORIES", res.data.data);
          commit("MUTATE", { state: "categories", value: res.data.data });
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
    getSingleJob({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("get", constants.SINGLEJOB(payload))
        .then((res) => {
          commit("MUTATE", { state: "singleJob", value: res.data.data[0] });
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
      commit("SET_LOADING", true, { root: true });
      call("post", constants.submit, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: "Success Submitted",
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
    getApplications({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("get", constants.APPLICATIONS(payload))
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
    saveQuestions: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.questions, data)
        .then(() => {})
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("redirectToAllapplications");
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    submitApplication: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("post", constants.submit, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("redirectToAllapplications");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    createApplication: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("post", constants.submit, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("redirectToQuestions");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    getSingleApplication({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("post", constants.SINGLEAPPLICATION, payload)
        .then((res) => {
          commit("MUTATE", {
            state: "singleApplication",
            value: res.data.data[0],
          });
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
