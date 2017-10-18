import Api from './Api.js';

export default {
    system () {
        return Api.get('panel/system');
    }
}
