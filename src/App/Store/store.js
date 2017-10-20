import Vue from 'vue';
import Vuex from 'vuex';
import Language from 'App/Api/Language.js';

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    translation: 'en',
    language: 'en',
    direction: 'ltr',
    user: null,
    notification: null,
    menu: false,
    icons: []
  },
  mutations: {
    menu (state, menu) {
      state.menu = menu;
    },
    icon (state, data) {
      state.icons[data.type] = data.svg;
    },
    language (state, language) {
      state.language = language;
      document.documentElement.lang = language;
      Vue.i18n.set(language);
    },
    direction (state, direction) {
      state.direction = direction;
      document.dir = direction;
    },
    translation (state, translation) {
      state.translation = translation;
    },
    notification (state, notification) {
      state.notification = notification;
    },
    user (state, user) {
      state.user = user;
    }
  },
  actions: {
    icon (context, data) {
      context.commit('icon', data);
    },
    user (context, user) {
      if (user === null) {
        localStorage.removeItem('auth');
        context.commit('user', null);
      } else {
        localStorage.setItem('auth', user.data.token);
        context.commit('user', user);
        context.dispatch('language', user.data.language);
      }
    },
    language (context, locale) {
      // if language strings have already been loaded
      if(Vue.i18n.localeExists(locale)) {
        context.commit('language', locale);

      // load language string json file
      } else {
        fetch(panel.config.assets + '/languages/' + locale + '/core.json').
        then((resource) => resource.json()).
        then((json) => {
          Vue.i18n.add(locale, json);
          context.commit('language', locale);
        });
      }

      Language.get(locale).then((language) => {
        context.commit('direction', language.direction);
      });

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
