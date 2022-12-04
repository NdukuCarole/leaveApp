import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import auth from "./modules/auth";
import profile from "./modules/profile";
import application from "./modules/application";
import appAlert from "./plugins/appAlert";
import confirmation from "./plugins/confirmtion";
import loader from "./plugins/loader";
import router from "./router";
import { filters } from "./utils";

Vue.config.productionTip = false;

const options = {
  store,
  router,
};

Vue.use(appAlert);
Vue.use(confirmation);
Vue.use(loader);
Vue.use(auth, options);
Vue.use(application, options);
Vue.use(profile, options);

/* Register Filters */
filters.forEach((f) => {
  Vue.filter(f.name, f.execute);
});

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
