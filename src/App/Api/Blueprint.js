import Api from './Api.js';

export default {
    list () {
        return Api.get('blueprints');
    },
    get (name) {
        return Api.get('blueprints/' + name);
    }
};
