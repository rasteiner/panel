import Vue from 'vue'

import Cards from 'Data/Cards/Cards.vue';
import List from 'Data/List/List.vue';
import Data from 'Data/Data.vue';

import Pages from 'Data/Pages/Pages.vue';
import Files from 'Data/Files/Files.vue';
import Users from 'Data/Users/Users.vue';

Vue.component('kirby-data-cards', Cards);
Vue.component('kirby-data-list', List);
Vue.component('kirby-data', Data);

Vue.component('kirby-pages', Pages);
Vue.component('kirby-files', Files);
Vue.component('kirby-users', Users);
