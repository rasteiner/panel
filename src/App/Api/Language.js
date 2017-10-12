import Api from './Api.js';

export default {
    list () {
        return Api.get('/panel/languages');
    },
    get (locale) {
        return Api.get('/panel/languages/' + locale);
    }
};
