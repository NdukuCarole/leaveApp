import store from "./landingStore";

export default {
  install(Vue, options) {
    options.store.registerModule("Landing", store);
  },
};
