import Api from './Api.js';

export default {
    create (parent, data) {

        if (parent === null || parent === '/') {
            return Api.post('site/children', data);
        }

        return Api.post('pages/' + parent + '/children', data);

    },
    get (id) {
        return Api.get('pages/' + id);
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
    }
};
