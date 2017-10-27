
import Auth from './Auth.js';
import File from './File.js';
import Language from './Language.js';
import Page from './Page.js';
import Panel from './Panel.js';
import Site from './Site.js';
import User from './User.js';
import Avatar from './Avatar.js';

export default {
    install (Vue) {
      Vue.prototype.$api = {
        auth: Auth,
        file: File,
        language: Language,
        page: Page,
        panel: Panel,
        site: Site,
        user: User,
        avatar: Avatar
      };
    },
    request (path, options) {

      const headers = new Headers();
      headers.append('Authorization', localStorage.getItem('auth'));

      options = Object.assign(options || {}, {
        headers: headers
      });

      return fetch(window.panel.config.api + '/' + path, options).then((response) => response.json()).then((json) => {
        if (json.status && json.status !== 'ok') {
          throw Error(json.message || json.status);
        }

        return json;
      });
    },
    get (path, options) {
      return this.request(path, Object.assign(options || {}, { method: 'GET' }));
    },
    post (path, data, options) {
      return this.request(path, Object.assign(options || {}, {
        method: 'POST',
        body: JSON.stringify(data)
      }));
    },
    delete (path) {
      return this.request(path, { method: 'DELETE' });
    }
  };
