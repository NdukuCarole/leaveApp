import call from "../../../../service/http";
import bioConstants from "./bioConstants";

export default {
  state: {
    bio: [],
    maritalStatus: [],
    titles: [],
    sectors: [],
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
    bioGetters: (state) => (val) => state[val],
  },
  actions: {
    getBio: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", bioConstants.bio)
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

    saveBio: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("patch", bioConstants.bio, data)
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

    updateBio: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", bioConstants.update, data)
        .then(() => {
          dispatch("getBio");
          dispatch("Auth/user", null, { root: true });
          Event.$emit("application-checklist");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    getMaritalStatus: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", bioConstants.marital)
        .then((res) => {
          commit("MUTATE", { state: "maritalStatus", value: res.data.data });
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
    getTitles: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", bioConstants.titles)
        .then((res) => {
          commit("MUTATE", { state: "titles", value: res.data.data });
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
    getSectors: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", bioConstants.sectors)
        .then((res) => {
          commit("MUTATE", { state: "sectors", value: res.data.data });
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
