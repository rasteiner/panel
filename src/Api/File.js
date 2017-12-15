import Api from './Api.js';

export default {
  get (page, filename) {
    return Api.get('pages/' + page + '/files/' + filename).then((file) => {

      if (Array.isArray(file.content) === true) {
        file.content = {};
      }

      return file;

    });
  },
  blueprint (page, filename) {
    return Api.get('pages/' + page + '/files/' + filename + '/blueprint');
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
  preview (file) {

    if (file.type === 'image') {
      return {
        image: file.url + '?v=' + file.modified
      }
    }

    let preview = {
      icon: 'file',
      color: '#81a2be'
    };

    switch (file.mime) {
      case 'application/zip':
        preview.icon = 'file-zip';
        break;
    }

    preview.color = this.color(file);

    switch (file.extension) {
      case 'indd':
        preview.color = '#cc6666';
        break;
      case 'pdf':
        preview.icon = 'file-pdf';
        break;
      case 'css': case 'js': case 'pdf': case 'xml':
        preview.icon = 'file-code';
        break;
      case 'xls': case 'xlsx': case 'csv':
        preview.icon = 'file-checklist';
        preview.color = '#b5bd68';
        break;
      case 'mdown': case 'md':
        preview.icon = 'markdown';
        break;
      case 'mov': case 'm4v':
        preview.icon = 'video';
        break;
    }

    return preview;

  },
  color (file) {

    switch (file.type) {
      case 'image':
        return '#454953';
      case 'video':
        return '#f0c674';
      case 'document':
        return '#cc6666';
      case 'audio':
        return '#8abeb7';
      case 'code':
        return '#b294bb';
      default:
        return '#81a2be';
    }

  },
  breadcrumb (file) {
    return Api.page.get(file.parent).then((page) => {

      let breadcrumb = Api.page.breadcrumb(page);

      breadcrumb.push({
        label: file.filename,
        link: '/pages/' + page.id + '/files/' + file.filename
      });

      return breadcrumb;
    });
  }
};
