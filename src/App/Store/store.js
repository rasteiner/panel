import Vue from 'vue';
import Vuex from 'vuex';
import Query from 'App/Api/Query.js';
import Api from 'App/Api/Api.js';

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    translation: 'en',
    language: 'en',
    direction: 'ltr',
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

      Api.get('languages/' + locale).then((language) => {
        context.commit('direction', language.direction);
        console.log(response);
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
