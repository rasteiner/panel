import Vue from "vue";
import Vuex from "vuex";
import Locale from "Api/Locale.js";

Vue.use(Vuex);

let notificationTimeout = null;

export default new Vuex.Store({
  state: {
    // content
    // TODO: replace with actual Site Title
    title: "Kirby Panel",
    translation: "en_US",
    changes: {},

    // user
    user: {
      id: null
    },
    locale: {
      id: "en_US",
      direction: "ltr"
    },

    // UI
    notification: null,
    menu: false,
    isLoading: false,

    // navigation
    afterLogin: null,
    breadcrumb: [],
    view: null
  },
  mutations: {
    // content
    title(state, title) {
      // TODO: replace with actual Site Title
      title = title + " | Kirby Panel";
      document.title = title;
      state.title = title;
    },
    translation(state, translation) {
      state.translation = translation;
    },

    // user
    user(state, user) {
      state.user = user;
    },
    locale(state, locale) {
      state.locale = locale;
      document.documentElement.lang = locale.id;
      Vue.i18n.set(locale.id);
      document.dir = locale.direction;
    },

    // UI
    notification(state, notification) {
      state.notification = notification;
    },
    menu(state, menu) {
      state.menu = menu;
    },
    isLoading(state, loading) {
      state.isLoading = loading;
    },

    // navigation
    afterLogin(state, url) {
      state.afterLogin = url;
    },
    breadcrumb(state, breadcrumb) {
      state.breadcrumb = breadcrumb;
    },
    view(state, view) {
      state.view = view;
    },

    changes(state, payload) {
      state.changes[payload.key] = payload.value;
    }
  },
  actions: {
    title(context, title) {
      context.commit("title", title);
    },

    // user
    user(context, user) {
      if (user === null) {
        context.commit("user", null);
      } else {
        context.commit("user", user);
        context.dispatch("locale", user.language);
      }
    },
    locale(context, id) {
      if (id) {
        Locale.get(id).then(locale => {
          Vue.i18n.replace(id, locale.data);
          context.commit("locale", locale);
        });
      }
    },

    // UI
    notification(context, notification) {
      context.commit("notification", notification);

      clearTimeout(notificationTimeout);

      notificationTimeout = setTimeout(() => {
        context.commit("notification", false);
      }, 2000);
    },
    success(context, message) {
      context.dispatch("notification", {
        message,
        type: "success"
      });
    },
    error(context, message) {
      context.dispatch("notification", {
        message,
        type: "error"
      });
    },
    isLoading(context, loading) {
      context.commit("isLoading", loading);
    },
    changes(context, payload) {
      context.commit("changes", payload);
    }
  },
  getters: {
    hasChanged(state) {
      return id => {
        console.log(id);

        return state.changes[id] === true;
      };
    }
  }
});
