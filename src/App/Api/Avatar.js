import Api from './Api.js';

export default {
  delete (id) {
    return Api.delete('users/' + id + '/avatar');
  }
};
