import constants from "./academicConstants";
import call from "@/service/http";

export default {
  state: {
    academic: [],
    specializations: [],
    grades: [],
    qualificationCodes: [],
    professionalCodes: [],
    academicCodes: [],
    certificationCodes: [],
    singleQualification: {},
    alert: {
      status: "",
      message: "",
    },
    acadmicAlert: {
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
    SET_ACADEMIC_ALERT: (state, payload) => {
      state.acadmicAlert = payload || {
        status: "",
        message: "",
      };
    },
  },

  getters: {
    academicGetters: (state) => (val) => state[val],
  },
  actions: {
    getAcademic: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.academic)
        .then((res) => {
          commit("MUTATE", { state: "academic", value: res.data.data });
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

    getSpecializations: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.specializations)
        .then((res) => {
          commit("MUTATE", { state: "specializations", value: res.data.data });
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
    getQualificationCodes: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.qualificationCodes)
        .then((res) => {
          commit("MUTATE", {
            state: "qualificationCodes",
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
    getProfessionalCodes: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.professionalCodes)
        .then((res) => {
          commit("MUTATE", {
            state: "professionalCodes",
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

    getAcademicCodes: ({ commit }) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("get", constants.academicCodes)
        .then((res) => {
          commit("MUTATE", {
            state: "academicCodes",
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
    saveAcademic: ({ commit, dispatch }, data) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.academic, data)
        .then(() => {
          /* re-fetch certifications */
          dispatch("getAcademic");
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

    removeAcademic: ({ commit, dispatch }, payload) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("post", constants.remove, payload)
        .then(() => {
          dispatch("getAcademic");
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

    updateAcademic: ({ dispatch, commit }, payload) => {
      commit("SET_LOADING", true, { root: true });
      call("patch", constants.academic, payload)
        .then(() => {
          dispatch("getAcademic");
          commit("SET_ALERT", {
            status: "success",
            message: "Successfully Updated",
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
    getOneQualification({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      call("get", constants.SINGLE(payload))
        .then((res) => {
          commit("MUTATE", {
            state: "singleQualification",
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
