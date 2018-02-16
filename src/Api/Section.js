import Api from './Api.js';

export default (parent, name, query) => {
    return Api.get(parent + '/' + name, query);
};
