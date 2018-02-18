import Api from "./Api.js";

export default {
  create(parent, data) {
    if (parent === null || parent === "/") {
      return Api.post("site/children", data);
    }

    return Api.post(this.url(parent, "children"), data);
  },
  url(id, path) {
    let url = id === null ? "pages" : "pages/" + id.replace("/", "+");

    if (path) {
      url += "/" + path;
    }

    return url;
  },
  link(id) {
    return "/" + this.url(id);
  },
  get(id, query) {
    return Api.get(this.url(id), query).then(page => {
      if (Array.isArray(page.content) === true) {
        page.content = {};
      }

      return page;
    });
  },
  options(id) {
    return Api.get(this.url(id, "options")).then(options => {
      let result = [];

      if (options.preview) {
        result.push({
          click: "preview",
          icon: "preview",
          text: "Open preview"
        });
      }

      if (options.changeUrl) {
        result.push({
          click: "url",
          icon: "chain",
          text: "Change URL"
        });
      }

      if (options.changeTemplate) {
        result.push({
          click: "template",
          icon: "code",
          text: "Change template"
        });
      }

      if (options.delete) {
        result.push({
          click: "remove",
          icon: "trash",
          text: "Delete this page"
        });
      }

      return result;
    });
  },
  update(id, data) {
    return Api.patch(this.url(id), data);
  },
  children(id, query) {
    return Api.post(this.url(id, "children/search"), query);
  },
  files(id, query) {
    return Api.post(this.url(id, "files/search"), query);
  },
  delete(id) {
    return Api.delete(this.url(id));
  },
  slug(id, slug) {
    return Api.post(this.url(id, "slug"), { slug: slug });
  },
  status(id, status, position) {
    return Api.post(this.url(id, "status"), {
      status: status,
      position: position
    });
  },
  breadcrumb(page, self = true) {
    var breadcrumb = page.parents.map(parent => ({
      label: parent.slug,
      link: this.link(parent.id)
    }));

    if (self === true) {
      breadcrumb.push({
        label: page.slug,
        link: this.link(page.id)
      });
    }

    return breadcrumb;
  }
};
