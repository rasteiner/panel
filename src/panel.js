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

/** API */
import Api from "Api/Api.js";

let loadingInterval = null;

Api.config.onStart = () => {
  if (Api.running === 0) {
    clearInterval(loadingInterval);
    loadingInterval = setTimeout(() => {
      store.dispatch("isLoading", true);
    }, 200);
  }
};

Api.config.onComplete = () => {
  if (Api.running === 0) {
    store.dispatch("isLoading", false);
    clearInterval(loadingInterval);
  }
};

Api.config.onError = error => {
  store.dispatch("error", error.message);
  throw error;
};

Vue.prototype.$api = Api;

/** Local Storage Cache */
Vue.prototype.$cache = {
  exists(id) {
    return this.get(id) !== null;
  },
  get(id) {
    let values = localStorage.getItem(id);
    return values && JSON.parse(values);
  },
  set(id, values) {
    values = Object.assign({}, this.get(id) || {}, values);
    localStorage.setItem(id, JSON.stringify(values));
  },
  field(id, field, value) {
    let values = this.get(id) || {};
    values[field] = value;
    this.set(id, values);
  },
  remove(id) {
    localStorage.removeItem(id);
  }
};

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
