export default {
  request(path, options) {
    if (localStorage.getItem("auth")) {
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + localStorage.getItem("auth"));

      options = Object.assign(options || {}, {
        headers: headers
      });
    }

    this.config.onStart();

    return fetch(window.panel.config.api + "/" + path, options)
      .then(response => response.json())
      .then(json => {
        if (json.status && json.status !== "ok") {
          throw Error(json.message || json.status);
        }
        this.config.onComplete();
        this.config.onSuccess(json);
        return json;
      })
      .catch(error => {
        this.config.onComplete();
        this.config.onError(error);
      });
  },
  get(path, query, options) {
    if (query) {
      path +=
        "?" +
        Object.keys(query)
          .map(key => key + "=" + query[key])
          .join("&");
    }

    return this.request(path, Object.assign(options || {}, { method: "GET" }));
  },
  post(path, data, options, method = "POST") {
    return this.request(
      path,
      Object.assign(options || {}, {
        method: method,
        body: JSON.stringify(data)
      })
    );
  },
  patch(path, data, options) {
    return this.post(path, data, options, "PATCH");
  },
  delete(path) {
    return this.request(path, { method: "DELETE" });
  }
};
