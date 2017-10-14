import Vue from 'vue'

import Counter from './Counter/Counter.vue'
import Loader from './Loader/Loader.vue'
import Notification from './Notification/Notification.vue';
import Progress from './Progress/Progress.vue'

Vue.component('kirby-counter', Counter);
Vue.component('kirby-loader', Loader);
Vue.component('kirby-notification', Notification);
Vue.component('kirby-progress', Progress);
