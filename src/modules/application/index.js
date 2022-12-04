import routes from "./applicationRoutes";
import store from "./applicationStore";

export default {
  install(Vue, options) {
    options.router.addRoute("/", ...routes);
    options.store.registerModule("Application", store);
  },
};
