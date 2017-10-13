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


/** Keyboard Shortcuts */
import Shortcuts from 'App/Shortcuts/Shortcuts.js';


/** Event bus */
const Events = new Vue({
  created () {
    window.addEventListener('keydown', Shortcuts.bind(this), false)
  },
  destroyed () {
    window.removeEventListener('keydown', Shortcuts, false)
  }
});

Object.defineProperties(Vue.prototype, {
  $events: {
    get: function () {
      return Events
    }
  }
});


/** i18n */
Vue.use(VuexI18n.plugin, store);
Vue.i18n.set(store.state.language);
Vue.i18n.fallback(store.state.language);
store.dispatch('language', store.state.language);

/** TODO: Remove Fake Login */
store.dispatch('login');

/** Ui Kit */
import 'Ui/Ui.js';

/** App Stuff */
import 'App/App.js';

new Vue({
  el: 'main',
  router,
  store
});
