export default {
    request (path, options) {
        return fetch(window.panel.config.api + '/' + path, options).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status !== 'ok') {
                throw Error(json.status);
            }

            return json;
        });
    },
    get (path, options) {
        return this.request(path, Object.assign(options || {}, {method: 'GET'}));
    },
    post (path, data, options) {
        return this.request(path, Object.assign(options || {}, {
            method: 'POST',
            body: JSON.stringify(data)
        }));
    },
    delete (path) {
        return this.request(path, {method: 'DELETE'});
    }
};
