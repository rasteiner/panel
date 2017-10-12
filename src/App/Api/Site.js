import Api from './Api.js';

export default {
    update (id, data) {
        return Api.post('site', data);
    },
    children (query) {
        return Api.post('site/children/search', query);
    }
};
