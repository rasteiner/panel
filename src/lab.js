import Vue from 'vue';
import VueRouter from 'vue-router';

/** Store */
import store from './store/store.js';

/** Routes */
import routes from './routes/routes.js';

/** UI Components */
import 'Components.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: 'main',
  router,
  store,
  created () {

  }
});
