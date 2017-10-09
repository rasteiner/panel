import Api from './Api.js';

export default {
    get (id) {
        return Api.get('pages/' + id);
    },
    update (id, data) {
        return Api.post('pages/' + id, data);
    },
    delete (id) {
        return Api.delete('pages/' + id);
    }
};
