import Spinner from "./views/Spinner";

export default {
  install(Vue) {
    Vue.component("loader", Spinner);
    // options.store.registerModule("Loader", store);
  },
};
