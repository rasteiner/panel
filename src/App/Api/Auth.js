import Api from './Api.js';

export default {
    validate () {
        return Api.get('session');
    },
    login (credentials) {
        return Api.post('session', credentials);
    },
    logout () {
        return Api.delete('session');
    }
};
