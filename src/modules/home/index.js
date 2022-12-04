import routes from "./homeRoutes";
import store from "./homeStore";

export default {
  install(Vue, options) {
    options.router.addRoute("/", ...routes);
    options.store.registerModule("Home", store);
  },
};
