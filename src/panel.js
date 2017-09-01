import Vue from 'vue';
import VueRouter from 'vue-router';
import VuexI18n from 'vuex-i18n';

/** Store */
import store from 'App/Store/store.js';

/** Routes */
import Routes from 'App/Routes/Routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});

/** i18n */
Vue.use(VuexI18n.plugin, store);
store.dispatch('language', store.state.language);
Vue.i18n.fallback(store.state.language);

/** TODO: Remove Fake Login */
store.dispatch('login');

/** Ui Kit */
import 'Ui/Ui.js';

/** App Stuff */
import 'App/App.js';

new Vue({
  el: 'main',
  router,
  store,
  created () {

  }
});
