import Vue from 'vue';
import VueRouter from 'vue-router';

/** Store */
import store from 'App/Store/Store.js';

/** Routes */
import Routes from 'App/Routes/Routes.js';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes
});

/** Ui Kit */
import 'Ui/Ui.js';

/** App Stuff */
import 'App/App.js';
