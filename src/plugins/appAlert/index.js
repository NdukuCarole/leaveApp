import appAlert from "./appAlert";
import { EventBus } from "@/utils/eventBus";

const alertPlugin = {
  install(Vue) {
    Vue.component("app-alert", appAlert);

    Vue.prototype.$alert = (params) => {
      EventBus.$emit("show-app-alert", params);
    };
  },
};

export default alertPlugin;
