import Vue from 'vue';
import config from 'panel.config.js';

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
import { Version } from '../../../package.json';

if (config.enableErrorTracking) {
  Raven.config(config.ravenKey).addPlugin(RavenVue, Vue).install();
  Raven.setTagsContext({ panel: Version });
}

/** Error logging helper function */
import store from 'App/Store/Store.js';

window.panel.error = (notification, msg) => {
  console.error(notification + ': ' + msg);
  store.dispatch('error', notification + '. See the console for more information.');
}
