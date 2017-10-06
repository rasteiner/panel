
export default {
    request(path, params) {
        return fetch(window.panel.config.api + '/' + path, params).then((response) => response.json())
    },
    get(path) {
        return this.request(path, {
            method: 'GET'
        });
    },
    post(data) {
        return this.request(path, {
            method: 'POST'
        });
    }
}
