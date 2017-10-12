import Api from './Api.js';

export default {
    get (page, filename) {
        return Api.get('pages/' + page + '/files/' + filename);
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
    }
};
