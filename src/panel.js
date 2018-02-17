import Vue from "vue";
import config from "./panel.config.js";

/** Error Handling & Tracking */
import "App/Errors/Errors.js";

/** Plugins */
import "App/Plugins/Loader.js";

/** Store */
import store from "App/Store/Store.js";

/** Routes */
import Router from "vue-router";
import Routes from "App/Routes/Routes.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: Routes
});

router.addRoutes(window.panel.plugins.routes);

router.beforeEach((to, from, next) => {
  store.dispatch("isLoading", true);
  next();
});

/** API */
import Api from "Api/Api.js";
Vue.prototype.$api = Api;

/** Event bus */
import Events from "App/Events/Events.js";
Vue.use(Events);

/** i18n */
import i18n from "vuex-i18n";
Vue.use(i18n.plugin, store);
Vue.i18n.fallback(store.state.locale.id);
store.dispatch("locale", store.state.locale.id);

/** Date formating */
import "App/Helpers/DateFilter.js";

/** App Components */
import "App/Components/Components.js";

window.panel.vue = new Vue({
  el: "main",
  router,
  store
});
