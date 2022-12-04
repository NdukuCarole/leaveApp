import call from "../../../../service/http";
import constants from "./attachmentConstants";
import { EventBus } from "@/utils/eventBus";

export default {
  state: {
    attachments: [],
    attachmentDocTypes: [],
    singleAttachment: {},
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
    attachmentGetters: (state) => (val) => state[val],
  },
  actions: {
    getAttachment: ({ commit }, payload) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", constants.GETATTACH(payload))
        .then((res) => {
          commit("MUTATE", { state: "attachments", value: res.data.data });
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

    saveAttachment: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.attachment, data.attachData)
        .then(() => {
          dispatch("getAttachment", data.profileID);
          EventBus.$emit("redirectToAttachment");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    editAttachment: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.updateAttachment, data.attachData)
        .then(() => {
          dispatch("getAttachment", data.profileID);
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    deleteAttachment: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.delAttachment, data.attachData)
        .then(() => {
          dispatch("getAttachment", data.profileID);
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    getAttachmentDocTypes: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.attachmentDocTypes)
        .then((res) => {
          commit("MUTATE", {
            state: "attachmentDocTypes",
            value: res.data.data,
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
    getOneAttachment({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("get", constants.SINGLE(payload))
        .then((res) => {
          commit("MUTATE", {
            state: "singleAttachment",
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
