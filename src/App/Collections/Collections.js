import Vue from 'vue'

import Pages from './Pages/Pages.vue';
import Files from './Files/Files.vue';
import Users from './Users/Users.vue';

Vue.component('kirby-pages-collection', Pages);
Vue.component('kirby-files-collection', Files);
Vue.component('kirby-users-collection', Users);
