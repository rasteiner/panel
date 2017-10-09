import Api from './Api.js';

export default {
    list (query) {
        return Api.post('/users/search', query);
    },
    get (id) {
        return Api.get('users/' + id);
    },
    update (id, data) {
        return Api.post('users/' + id, data);
    }
};
