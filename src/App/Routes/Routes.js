import DashboardView from '../Views/DashboardView/DashboardView.vue';
import LoginView from '../Views/LoginView/LoginView.vue';
import PageView from '../Views/PageView/PageView.vue';
import FileView from '../Views/FileView/FileView.vue';
import UsersView from '../Views/UsersView/UsersView.vue';
import UserView from '../Views/UserView/UserView.vue';
import SettingsView from '../Views/SettingsView/SettingsView.vue';

/* store */
import store from '../Store/store.js';

const auth = (to, from, next) => {
  if (store.state.user) {
    next();
  } else {
    next('/login');
  }
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
    path: '/pages',
    name: 'Site',
    component: PageView,
    beforeEnter: auth,
    props: (route) => ({
      path: '/'
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
    path: '/files/:path+',
    name: 'File',
    component: FileView,
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
