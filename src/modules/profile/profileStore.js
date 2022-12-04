// import constants from "./profileConstants";
// import { call } from "@/service";
import bioStore from "./components/bio/bioStore";
import contactStore from "./components/contact/contactStore";

export default {
  namespaced: true,
  modules: {
    bioStore,
    contactStore,
  },
  state: {
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
  actions: {},
};
