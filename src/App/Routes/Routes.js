import DashboardView from '../Views/DashboardView/DashboardView.vue';
import FileView from '../Views/FileView/FileView.vue';
import InstallationView from '../Views/InstallationView/InstallationView.vue';
import LoginView from '../Views/LoginView/LoginView.vue';
import PageView from '../Views/PageView/PageView.vue';
import SettingsView from '../Views/SettingsView/SettingsView.vue';
import CreatePageView from '../Views/CreatePageView/CreatePageView.vue';
import TemplateView from '../Views/TemplateView/TemplateView.vue';
import UsersView from '../Views/UsersView/UsersView.vue';
import UserView from '../Views/UserView/UserView.vue';

/* store */
import store from '../Store/store.js';
import Auth from 'App/Api/Auth.js';

const auth = (to, from, next) => {

  Auth.validate().then((user) => {
    store.dispatch('user', user);
    next();
  }).catch(() => {
    next('/login');
  });

};

export default [
  {
    path: '/',
    component: DashboardView,
    beforeEnter: auth
  },
  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (store.state.user !== null) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/installation',
    component: InstallationView,
    beforeEnter: (to, from, next) => {
      store.dispatch('user', null);
      if (store.state.user !== null) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/pages',
    name: 'Site',
    component: PageView,
    beforeEnter: auth,
    props: (route) => ({
      path: '/'
    })
  },
  {
    path: '/pages/new',
    name: 'CreateMainPage',
    component: CreatePageView,
    beforeEnter: auth,
    props: (route) => ({
      path: '/'
    })
  },
  {
    path: '/pages/:path+/new',
    name: 'CreatePage',
    component: CreatePageView,
    beforeEnter: auth,
    props: (route) => ({
      path: route.params.path
    })
  },
  {
    path: '/pages/:path+/files/:filename',
    name: 'File',
    component: FileView,
    beforeEnter: auth,
    props: (route) => ({
      path: route.params.path,
      filename: route.params.filename
    })
  },
  {
    path: '/pages/:path+',
    name: 'Page',
    component: PageView,
    beforeEnter: auth,
    props: (route) => ({
      path: route.params.path
    })
  },
  {
    path: '/template/:path+',
    name: 'Template',
    component: TemplateView,
    beforeEnter: auth,
    props: (route) => ({
      path: route.params.path
    })
  },
  {
    path: '/users/role/:role',
    name: 'UsersByRole',
    component: UsersView,
    beforeEnter: auth,
    props: (route) => ({
      role: route.params.role
    })
  },
  {
    path: '/users',
    name: 'Users',
    beforeEnter: auth,
    component: UsersView
  },
  {
    path: '/users/:email',
    name: 'User',
    component: UserView,
    beforeEnter: auth,
    props: (route) => ({
      email: route.params.email
    })
  },
  {
    path: '/settings',
    name: 'Settings',
    beforeEnter: auth,
    component: SettingsView
  }
]
