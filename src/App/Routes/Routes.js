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
    component: PageView
  },
  {
    path: '/pages/:page+',
    name: 'Page',
    component: PageView
  },
  {
    path: '/users/role/:role',
    name: 'UsersByRole',
    component: UsersView
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/users/:email',
    name: 'User',
    component: UserView
  }
]
