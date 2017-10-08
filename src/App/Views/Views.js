import Vue from 'vue'

import './PageView/PageView.js';

import UsersView from './UsersView/UsersView.vue';
import UserView from './UserView/UserView.vue';

Vue.component('kirby-users-view', UsersView);
Vue.component('kirby-user-view', UserView);
