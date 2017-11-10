import Api from './Api.js';

export default {
  create (parent, data) {

    if (parent === null || parent === '/') {
      return Api.post('site/children', data);
    }

    return Api.post('pages/' + parent + '/children', data);

  },
  get (id) {
    return Api.get('pages/' + id).then((page) => {

      if (Array.isArray(page.content) === true) {
        page.content = {};
      }

      return page;

    });
  },
  options (id) {
    return Api.get('pages/' + id + '/options');
  },
  update (id, data) {
    return Api.post('pages/' + id, data);
  },
  children (id, query) {
    return Api.post('pages/' + id + '/children/search', query);
  },
  files (id, query) {
    return Api.post('pages/' + id + '/files/search', query);
  },
  delete (id) {
    return Api.delete('pages/' + id);
  },
  slug (id, slug) {
    return Api.post('pages/' + id + '/slug', { slug: slug });
  },
  status (id, status, position) {
    return Api.post('pages/' + id + '/status', {
      status: status,
      position: position
    });
  },
  blueprint (id) {
    return Api.get('pages/' + id + '/blueprint');
  },
  blueprints (id) {
    return Api.get('pages/' + id + '/blueprints');
  },
  breadcrumb (page, self = false) {
    var breadcrumb = page.parents.map((parent) => ({
      label: parent.title,
      link: '/pages/' + parent.id
    }));

    if (self === true) {
      breadcrumb.push({
        label: page.title,
        link: '/pages/' + page.id
      })
    }

    return breadcrumb;
  }
};
