import constants from "./profileConstants";
import { call } from "@/service";
import academicStore from "./components/academic/academicStore";
import bioStore from "./components/bio/bioStore";
import contactStore from "./components/contact/contactStore";
import Experiencestore from "./components/experience/ExperienceStore";
import refereeStore from "./components/referees/refereeStore";
import attachmentStore from "./components/attachments/attachmentStore";

export default {
  namespaced: true,
  modules: {
    academicStore,
    bioStore,
    contactStore,
    Experiencestore,
    refereeStore,
    attachmentStore,
  },
  state: {
    jobs: [],
    categories: [],
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
    alert: (state) => state.alert,

    profileGetters: (state) => (val) => state[val],
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
  },
};
