import config from './panel.config.js';
import Vue from 'vue';

/** Error Handling */
Vue.config.errorHandler = function (err, vm) {
  vm.$store.dispatch('error', 'Something went wrong. Thanks for finding a bug, it has been reported!');
};

/** Error Tracking */
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven.config(config.ravenKey).addPlugin(RavenVue, Vue).install();

/** Store */
import store from 'App/Store/Store.js';

/** Routes */
import Router from 'vue-router';
import Routes from 'App/Routes/Routes.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: Routes,
  beforeEach: (to, from, next) => {
    store.dispatch('isLoading', true);
    next();
  }
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

/** App Stuff */
import 'App/App.js';

new Vue({
  el: 'main',
  router,
  store
});
