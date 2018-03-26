/* Code splitting along views */

const FileView = () =>
  import(/* webpackChunkName: "file-view" */
  "../Views/FileView/FileView.vue");
const InstallationView = () =>
  import(/* webpackChunkName: "installation-view" */
  "../Views/InstallationView/InstallationView.vue");
const LoginView = () =>
  import(/* webpackChunkName: "login-view" */
  "../Views/LoginView/LoginView.vue");
const PageView = () =>
  import(/* webpackChunkName: "page-view" */
  "../Views/PageView/PageView.vue");
const SiteView = () =>
  import(/* webpackChunkName: "site-view" */
  "../Views/SiteView/SiteView.vue");
const UsersView = () =>
  import(/* webpackChunkName: "users-view" */
  "../Views/UsersView/UsersView.vue");
const UserView = () =>
  import(/* webpackChunkName: "user-view" */
  "../Views/UserView/UserView.vue");

/* Store */
import store from "../Store/Store.js";

/* Api */
import Auth from "Api/Auth.js";

const views = {
  site: {
    label: "Site",
    link: "/",
    icon: "page"
  },
  users: {
    label: "Users",
    link: "/users",
    icon: "users"
  }
};

/* Route filters */
export const auth = (to, from, next) => {
  // check if user is logged in
  Auth.user()
    .then(user => {
      if (user.permissions.access.panel === false) {
        throw new Error("You are not allowed to login to the panel");
      }

      if (to.meta.view && user.permissions.access[to.meta.view] !== true) {
        throw new Error("You don't have access to this part of the panel");
      }

      // store logged-in user
      store.commit("view", views[to.meta.view]);
      store.dispatch("user", user);
      next();
    })
    .catch(e => {
      Auth.logout();
      store.dispatch("user", null);
      store.dispatch("error", e.message);
      next("/login");
    });
};

/* Routes */
export default [
  {
    path: "/",
    redirect: "/pages"
  },
  {
    path: "/login",
    component: LoginView
  },
  {
    path: "/logout",
    redirect: to => {
      store.dispatch("user", null);
      return "/login";
    }
  },
  {
    path: "/installation",
    component: InstallationView,
    beforeEnter: (to, from, next) => {
      store.dispatch("user", null);
      if (store.state.user !== null) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/pages",
    name: "Site",
    meta: {
      view: "site"
    },
    component: SiteView,
    beforeEnter: auth
  },
  {
    path: "/pages/:path+/files/:filename",
    name: "File",
    meta: {
      view: "site"
    },
    component: FileView,
    beforeEnter: auth,
    props: route => ({
      path: route.params.path,
      filename: route.params.filename
    })
  },
  {
    path: "/pages/:path+",
    name: "Page",
    meta: {
      view: "site"
    },
    component: PageView,
    beforeEnter: auth,
    props: route => ({
      path: route.params.path
    })
  },
  {
    path: "/users/role/:role",
    name: "UsersByRole",
    meta: {
      view: "users"
    },
    component: UsersView,
    beforeEnter: auth,
    props: route => ({
      role: route.params.role
    })
  },
  {
    path: "/users",
    name: "Users",
    meta: {
      view: "users"
    },
    beforeEnter: auth,
    component: UsersView
  },
  {
    path: "/users/:id",
    name: "User",
    meta: {
      view: "users"
    },
    component: UserView,
    beforeEnter: auth,
    props: route => ({
      id: route.params.id
    })
  },
  {
    path: "*",
    name: "NotFound",
    beforeEnter: (to, from, next) => {
      next("/");
      store.dispatch("error", "This view does not exist");
    }
  }
];
