import Vue from 'vue';

/** Error Tracking */
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';

// Raven.config('https://b279326197d741d1b1013baef2c5f93e@sentry.io/235642').addPlugin(RavenVue, Vue).install();

/** Routes */
import Router from 'vue-router';
import Routes from 'App/Routes/Routes.js';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: Routes
});

/** Store */
import store from 'App/Store/store.js';

router.beforeEach((to, from, next) => {
  store.dispatch('isLoading', true);
  next();
});


/** API */
import Api from 'App/Api/Api.js';
Vue.use(Api);

/** Event bus */
import Events from 'App/Events/Events.js';
Vue.use(Events);

/** i18n */
import i18n from 'vuex-i18n';
Vue.use(i18n.plugin, store);
Vue.i18n.set(store.state.language);
Vue.i18n.fallback(store.state.language);
store.dispatch('language', store.state.language);

/** Ui Kit */
import 'Ui/Ui.js';

/** App Stuff */
import 'App/App.js';


new Vue({
  el: 'main',
  router,
  store
});
