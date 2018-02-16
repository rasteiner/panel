import Api from './Api.js';

export default {
    validate () {
        return Api.get('auth/user');
    },
    login (credentials) {
        return Api.post('auth', credentials).then((auth) => {
            localStorage.setItem('auth', auth.token);
            return auth.user;
        });
    },
    logout () {
        localStorage.removeItem('auth');
    }
};
