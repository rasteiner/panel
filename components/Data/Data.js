import Vue from 'vue'

import Pages from 'Data/Pages/Pages.vue';
import Files from 'Data/Files/Files.vue';
import Users from 'Data/Users/Users.vue';

Vue.component('kirby-pages', Pages);
Vue.component('kirby-files', Files);
Vue.component('kirby-users', Users);
