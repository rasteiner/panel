import Vue from 'vue'

import PageView from './PageView/PageView.vue';
import CreatePageView from './CreatePageView/CreatePageView.vue';
import TemplateView from './TemplateView/TemplateView.vue';
import UsersView from './UsersView/UsersView.vue';
import UserView from './UserView/UserView.vue';

Vue.component('kirby-page-view', PageView);
Vue.component('kirby-create-page-view', CreatePageView);
Vue.component('kirby-template-view', TemplateView);
Vue.component('kirby-users-view', UsersView);
Vue.component('kirby-user-view', UserView);
