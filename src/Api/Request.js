
export default {
  request (path, options) {

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth'));

    options = Object.assign(options || {}, {
      headers: headers
    });

    return fetch(window.panel.config.api + '/' + path, options)
      .then((response) => response.json())
      .then((json) => {
        if (json.status && json.status !== 'ok') {
          throw Error(json.message || json.status);
        }

      return json;
    });
  },
  get (path, options) {
    return this.request(path, Object.assign(options || {}, { method: 'GET' }));
  },
  post (path, data, options) {
    return this.request(path, Object.assign(options || {}, {
      method: 'POST',
      body: JSON.stringify(data)
    }));
  },
  delete (path) {
    return this.request(path, { method: 'DELETE' });
  }
};
