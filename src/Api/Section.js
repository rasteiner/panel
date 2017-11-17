import Api from './Api.js';

export default (type, config) => {
    return Api.post('sections/' + type, config);
};
