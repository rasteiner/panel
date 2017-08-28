import PageView from '../Views/PageView/PageView.vue';
import UsersView from '../Views/UsersView/UsersView.vue';
import UserView from '../Views/UserView/UserView.vue';

export default [
  {
    path: '/',
    redirect: '/pages'
  },
  {
    path: '/pages',
    name: 'Site',
    component: PageView,
    props: (route) => {
      return {
        path: '/'
      };
    }
  },
  {
    path: '/pages/:page+',
    name: 'Page',
    component: PageView,
    props: (route) => {
      return {
        path: route.params.page
      };
    }
  },
  {
    path: '/users/role/:role',
    name: 'UsersByRole',
    component: UsersView,
    props: (route) => {
      return {
        role: route.params.role
      };
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/users/:email',
    name: 'User',
    component: UserView,
    props: (route) => {
      return {
        email: route.params.email
      };
    }
  }
]
