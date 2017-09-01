import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    translation: 'EN',
    language: 'en',
    user: null,
    notification: null,
    menu: false
  },
  mutations: {
    menu (state, menu) {
      state.menu = menu;
    },
    language (state, language) {
      state.language = language;
      Vue.i18n.set(language);
    },
    translation (state, translation) {
      state.translation = translation;
    },
    notification (state, notification) {
      state.notification = notification;
    },
    login (state) {
      const user = {
        email: 'bastian@getkirby.com',
        firstName: 'Bastian',
        language: 'en'
      };
      state.user = user;
    },
    logout (state) {
      state.user = null;
    }
  },
  actions: {
    login (context) {
      context.commit('login');
      context.dispatch('language', context.state.user.language);
    },
    logout (context) {
      context.commit('logout');
    },
    language (context, locale) {
      if(Vue.i18n.localeExists(locale) === false) {
        fetch('/languages/' + locale + '/core.json').
        then((resource) => resource.json()).
        then((json) => {
          Vue.i18n.add(locale, json);
        });
      }

      context.commit('language', locale);
    },
    notification (context, notification) {
      context.commit('notification', notification);

      clearTimeout(notificationTimeout);

      notificationTimeout = setTimeout(() => {
        context.commit('notification', false);
      }, 2000);
    },
    success (context, message) {
      context.dispatch('notification', {
        message,
        type: 'success'
      });
    },
    error (context, message) {
      context.dispatch('notification', {
        message,
        type: 'error'
      });
    }
  }
});
