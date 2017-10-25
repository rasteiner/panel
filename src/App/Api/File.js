import Api from './Api.js';
import Page from './Page.js';

export default {
  get (page, filename) {
    return Api.get('pages/' + page + '/files/' + filename).then((file) => {

      if (Array.isArray(file.content) === true) {
        file.content = {};
      }

      return file;

    });
  },
  update (page, filename, data) {
    return Api.post('pages/' + page + '/files/' + filename, data);
  },
  rename (page, filename, to) {
    return Api.post('pages/' + page + '/files/' + filename + '/rename', {
        name: to
    });
  },
  delete (page, filename) {
    return Api.delete('pages/' + page + '/files/' + filename);
  },
  breadcrumb (file) {
    return Page.get(file.parent).then((page) => {
      var breadcrumb = page.parents.map((parent) => ({
        label: parent.title,
        link: '/pages/' + parent.id
      }));

      breadcrumb.push({
        label: page.title,
        link: '/pages/' + page.id
      });

      return breadcrumb;
    });
  }
};
