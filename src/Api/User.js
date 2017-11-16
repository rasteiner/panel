import Vue from 'vue';

import Api from './Api.js';

export default {
  create (data) {
    return Api.post('users', data);
  },
  list (query) {
    return Api.post('users/search', query);
  },
  get (id) {
    return Api.get('users/' + id);
  },
  update (id, data) {
    return Api.post('users/' + id, data);
  },
  delete (id) {
    return Api.delete('users/' + id);
  },
  changePassword (id, password) {
    return Api.post('users/' + id + '/password', { password: password });
  },
  changeRole (id, role) {
    return Api.post('users/' + id + '/role', { role: role });
  },
  deleteAvatar (id) {
    return Api.delete('users/' + id + '/avatar');
  },
  blueprint (id) {
    return Api.get('users/' + id + '/blueprint');
  },
  breadcrumb (user) {
    return [
      {
        link: '/users/role/' + user.role,
        label: Vue.i18n.translate('user.role') + ': ' + user.role
      }
    ];
  },
  roles () {
    return [
      {
        value: 'admin',
        text: 'Admin',
        info: 'All rights granted.'
      },
      {
        value: 'editor',
        text: 'Editor',
        info: 'User can edit but not adjust settings or manage users themself.'
      },
      {
        value: 'visitor',
        text: 'Visitor',
        info: 'No rights (ideal for frontend users).'
      }
    ];
  }
};
