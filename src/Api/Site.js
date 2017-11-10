import Api from './Api.js';

export default {
    get () {
        return Api.get('site');
    },
    update (id, data) {
        return Api.post('site', data);
    },
    children (query) {
        return Api.post('site/children/search', query);
    },
    blueprint () {
        return Api.get('site/blueprint');
    },
    blueprints () {
        return Api.get('site/blueprints');
    }
 };
