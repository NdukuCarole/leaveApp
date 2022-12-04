import call from "@/service/http";
import AuthConstants from "./authConstants";
import AuthService from "./authService";
import { EventBus } from "@/utils/eventBus";

export default {
  namespaced: true,
  state: {
    otpModal: false,
    openforgotOtp: false,
    terms: {},
    results: null,
    alert: {
      status: "",
      message: "",
    },
  },
  mutations: {
    SET_TERMS: (state, payload) => {
      state.terms = payload;
    },

    SET_REQUIREMENTS: (state, payload) => {
      state.requirements = payload;
    },

    SET_RESULTS: (state, payload) => {
      state.results = payload;
    },

    SET_OTP_MODAL: (state, payload) => {
      state.otpModal = payload;
    },
    SET_FORGOT_OTP_MODAL: (state, payload) => {
      state.openforgotOtp = payload;
    },

    SET_ALERT: (state, payload) => {
      state.alert = payload || {
        status: "",
        message: "",
      };
    },
  },
  getters: {
    error: (state) => state.error,
    results: (state) => state.results,
    alert: (state) => state.alert,
    otpModal: (state) => state.otpModal,
    openforgotOtp: (state) => state.openforgotOtp,
  },
  actions: {
    login: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.login, data).then((res) => {
        console.log(res);
        if (res.data.data.authStatus === "success") {
          AuthService.login(res.data.data.token, res.data.data.user);
          commit("SET_LOADING", false, { root: true });
        } else {
          if (res.data.data.authStatus === "error") {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.data,
            });
            commit("SET_LOADING", false, { root: true });
          }
        }
      });
    },

    setPassword: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.setPassword, data)
        .then((res) => {
          AuthService.login(res.data.data.token, res.data.data.user);
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

    search: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      commit("SET_RESULTS", null);

      call("post", AuthConstants.verify, data)
        .then((res) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_RESULTS", res.data.data);
          EventBus.$emit("search-success");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("search-failed", err.response.data.message);
        });
    },

    forgotPassword: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("post", AuthConstants.passwordReset, data)
        .then((res) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: res.data.data.message,
          });
          EventBus.$emit("forgot-otp-sent");
        })
        .catch((err) => {
          console.log(err);
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    resetPassword: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.password, data)
        .then(() => {
          // AuthService.login(res.data.data.token, res.data.data.user);
          EventBus.$emit("password-set-success");
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

    user: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", AuthConstants.user)
        .then((res) => {
          AuthService.setUser(res.data.data);
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

    logout: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("SET_LOADING", true, { root: true });
      call("get", AuthConstants.logout)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          AuthService.logout();
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    register: ({ commit, dispatch }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("post", AuthConstants.register, data)
        .then((res) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: res.data.data.message,
          });
          dispatch("openOtp", true);
          // EventBus.$emit("routeBack");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    sendOtp: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      call("post", AuthConstants.sendOtp, data)
        .then((res) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: res.data.data.message,
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

    verifyOtp: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.verifyOtp, data)
        .then((res) => {
          commit("SET_LOADING", false, { root: true });
          AuthService.login(res.data.data.token, res.data.data.user);
          EventBus.$emit("redirectToAcademic");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },
    verifyforgotOtp: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.verifyOtp, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("otp-verification-success");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    verifyToken: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.verifyToken, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("token-verification-success");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit(
            "token-verification-failed",
            err.response.data.message
          );
        });
    },

    sendToken: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);
      call("post", AuthConstants.sendVoterToken, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("token-sending-failed", err.response.data.message);
        });
    },

    sendVotingOtp: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.verifyOtp, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("otp-verification-success");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    verifyVotingOtp: ({ commit }, data) => {
      commit("SET_LOADING", true, { root: true });
      commit("SET_ALERT", null);

      call("post", AuthConstants.verifyToken, data)
        .then(() => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit("token-verification-success");
        })
        .catch((err) => {
          commit("SET_LOADING", false, { root: true });
          EventBus.$emit(
            "token-verification-failed",
            err.response.data.message
          );
        });
    },
    openOtp({ commit }, payload) {
      console.log(payload);
      commit("SET_OTP_MODAL", payload);
    },
    openforgotOtp({ commit }, payload) {
      console.log(payload);
      commit("SET_FORGOT_OTP_MODAL", payload);
    },
  },
};
