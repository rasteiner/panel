const CreatePageView = () => import(
  /* webpackChunkName: "create-page-view" */
  '../Views/CreatePageView/CreatePageView.vue'
);
const DashboardView = () => import(
  /* webpackChunkName: "dashboard-view" */
  '../Views/DashboardView/DashboardView.vue'
);
const FileView = () => import(
  /* webpackChunkName: "file-view" */
  '../Views/FileView/FileView.vue'
);
const InstallationView = () => import(
  /* webpackChunkName: "installation-view" */
  '../Views/InstallationView/InstallationView.vue'
);
const LoginView = () => import(
  /* webpackChunkName: "login-view" */
  '../Views/LoginView/LoginView.vue'
);
const PageView = () => import(
  /* webpackChunkName: "page-view" */
  '../Views/PageView/PageView.vue'
);
const SettingsView = () => import(
  /* webpackChunkName: "settings-view" */
  '../Views/SettingsView/SettingsView.vue'
);
const SiteView = () => import(
  /* webpackChunkName: "site-view" */
  '../Views/SiteView/SiteView.vue'
);
const TemplateView = () => import(
  /* webpackChunkName: "template-view" */
  '../Views/TemplateView/TemplateView.vue'
);
const UsersView = () => import(
  /* webpackChunkName: "users-view" */
  '../Views/UsersView/UsersView.vue'
);
const UserView = () => import(
  /* webpackChunkName: "user-view" */
  '../Views/UserView/UserView.vue'
);

/* store */
import store from '../Store/Store.js';
import Auth from 'App/Api/Auth.js';
import Panel from 'App/Api/Panel.js';

const auth = (to, from, next) => {

  Auth.validate().then((user) => {
    store.dispatch('user', user);
    next();
  }).catch(() => {
    store.commit('afterLogin', to.path);
    next('/login');
  });

};

export default [
  {
    path: '/',
    redirect: '/pages'
  },
  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to, from, next) => {

      Panel.system().then((system) => {

        if (system.isInstalled === false) {
          return next('/installation');
        }

        if (store.state.user !== null) {
          return next('/');
        }

        return next();

      });

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
    component: SiteView,
    beforeEnter: auth
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
    path: '/users/:id',
    name: 'User',
    component: UserView,
    beforeEnter: auth,
    props: (route) => ({
      id: route.params.id
    })
  },
  {
    path: '/settings',
    name: 'Settings',
    beforeEnter: auth,
    component: SettingsView
  },
  {
    path: '*',
    name: 'NotFound',
    beforeEnter: (to, from, next) => {
      store.dispatch('error', 'This view does not exist');
      next('/');
    }
  }
]
