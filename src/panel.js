import Vue from 'vue';
import config from './panel.config.js';

/** Error Handling */
Vue.config.errorHandler = (err, vm) => {

  console.error(err);

  if (config.enableErrorTracking) {
    vm.$store.dispatch('error', 'Something went wrong. Thanks for finding a bug, it has been reported!');
  } else {
    vm.$store.dispatch('error', 'Something went wrong. See the console for more information.');
  }

};

/** Error Tracking */
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

if (config.enableErrorTracking) {
  Raven.config(config.ravenKey).addPlugin(RavenVue, Vue).install();
}

/** Store */
import store from 'App/Store/Store.js';

/** Routes */
import Router from 'vue-router';
import Routes from 'App/Routes/Routes.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: Routes
});

router.beforeEach((to, from, next) => {
  store.dispatch('isLoading', true);
  next();
});

/** API */
import Api from 'Api/Api.js';
Vue.use(Api);

/** Event bus */
import Events from 'App/Events/Events.js';
Vue.use(Events);

/** i18n */
import i18n from 'vuex-i18n';
Vue.use(i18n.plugin, store);
Vue.i18n.fallback(store.state.language.locale);
store.dispatch('language', store.state.language.locale);

/** Date formating */
import { DateTime } from 'luxon';

Vue.filter('date', function(value, output) {
  let dt = Array.isArray(value) ? DateTime.fromString(value[0], value[1]) : DateTime.fromString(value);
  return dt.
          setLocale(store.state.language.locale).
          toLocaleString(typeof output === 'string' ? DateTime[output] : output)
});

/** Plugins */
import 'App/Plugins/Plugins.js';

/** App Kit */
import 'App/App.js';

window.panel.vue = new Vue({
  el: 'main',
  router,
  store
});
