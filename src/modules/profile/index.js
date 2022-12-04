import routes from "./profileRoutes";
import store from "./profileStore";

export default {
  install(Vue, options) {
    options.router.addRoute("/", ...routes);
    options.store.registerModule("Profile", store);
  },
};
