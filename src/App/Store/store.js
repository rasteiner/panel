import Vue from 'vue';
import Vuex from 'vuex';
import Language from 'Api/Language.js';

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    // content
    translation: 'en',

    // user
    user: null,
    language: {
      locale: 'en',
      direction: 'ltr'
    },

    // UI
    notification: null,
    menu: false,
    isLoading: false,

    // navigation
    afterLogin: null
  },
  mutations: {
    // content
    translation (state, translation) {
      state.translation = translation;
    },

    // user
    user (state, user) {
      state.user = user;
    },
    language (state, language) {
      state.language = language;
      document.documentElement.lang = language.locale;
      Vue.i18n.set(language.locale);
      document.dir = language.direction;
    },

    // UI
    notification (state, notification) {
      state.notification = notification;
    },
    menu (state, menu) {
      state.menu = menu;
    },
    isLoading (state, loading) {
      state.isLoading = loading;
    },

    // navigation
    afterLogin (state, url) {
      state.afterLogin = url;
    }
  },
  actions: {
    // user
    user (context, user) {
      if (user === null) {
        localStorage.removeItem('auth');
        context.commit('user', null);
      } else {
        localStorage.setItem('auth', user.content.token);
        context.commit('user', user);
        context.dispatch('language', user.content.language);
      }
    },
    language (context, locale) {
      if (locale) {
        Language.get(locale).then((language) => {
          Vue.i18n.replace(locale, language.strings);
          Vue.moment.locale(locale);
          context.commit('language', {
            locale: language.locale,
            direction: language.direction
          });
        });
      }
    },

    // UI
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
    },
    isLoading (context, loading) {
      context.commit('isLoading', loading);
    }
  }
});
