import confirmation from "./Confirmation";
import { EventBus } from "@/utils/eventBus";

const ConfirmPlugin = {
  install(Vue) {
    Vue.component("confirmation", confirmation);

    Vue.prototype.$confirm = {
      show(params) {
        EventBus.$emit("show", params);
      },
    };
  },
};

export default ConfirmPlugin;
