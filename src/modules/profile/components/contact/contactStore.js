import call from "../../../../service/http";
import contactConstants from "./contactConstants";
import { EventBus } from "@/utils/eventBus";

export default {
  state: {
    contact: [],
    contactAlert: {
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
    SET_CONTACT_ALERT: (state, payload) => {
      state.contactAlert = payload || {
        status: "",
        message: "",
      };
    },
  },
  getters: {
    contactGetters: (state) => (val) => state[val],
  },
  actions: {
    getContact: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", contactConstants.contact)
        .then((res) => {
          commit("MUTATE", { state: "contact", value: res.data.data });
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

    saveContact: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", contactConstants.contact, data)
        .then(() => {
          dispatch("getContact");
          EventBus.$emit("directToApplication");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    editContact: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("patch", contactConstants.contact, data)
        .then(() => {
          dispatch("getContact");
          commit("SET_ALERT", {
            status: "success",
            message: "Success Edited Contacts",
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
