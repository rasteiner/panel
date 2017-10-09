import Api from './Api.js';

export default {
    get (name) {
        return Api.get('blueprints/' + name);
    }
};
