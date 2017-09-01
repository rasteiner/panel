import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    assets: '/assets',
    api: '/api',
    language: 'EN',
    translation: 'EN',
    user: {
      email: 'bastian@getkirby.com',
      firstName: 'Bastian'
    },
    notification: null,
    menu: false
  },
  mutations: {
    assets(state, assets) {
      state.assets = assets;
    },
    api(state, api) {
      state.api = api;
    },
    menu (state, menu) {
      state.menu = menu;
    },
    language (state, language) {
      state.language = language;
    },
    notification (state, notification) {
      state.notification = notification;
    },
    login (state) {
      state.user = {
        email: 'bastian@getkirby.com',
        firstName: 'Bastian'
      };
    },
    logout (state) {
      state.user = null;
    }
  },
  actions: {
    login (context) {
      context.commit('login');
    },
    logout (context) {
      context.commit('logout');
    },
    notification (context, notification) {
      context.commit('notification', notification);

      clearTimeout(notificationTimeout);

      notificationTimeout = setTimeout(function () {
        context.commit('notification', false);
      }, 2000);
    },
    success (context, message) {
      context.dispatch('notification', {message, type: 'success'});
    },
    error (context, message) {
      context.dispatch('notification', {message, type: 'error'});
    }
  },
  getters: {
    api (state) {
      return state.api;
    }
  }
});
