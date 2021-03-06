import Api from "./Api.js";

export default {
  create(parent, data) {
    if (parent === null || parent === "/") {
      return Api.post("site/children", data);
    }

    return Api.post(this.url(parent, "children"), data);
  },
  url(id, path) {
    let url = id === null ? "pages" : "pages/" + id.replace(/\//g, "+");

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
  options(id, view) {
    return Api.get(this.url(id, "options")).then(options => {
      let result = [];

      if (view === "list") {
        result.push({
          click: "preview",
          icon: "open",
          text: "Open",
          disabled: !options.preview
        });
      }

      result.push({
        click: "rename",
        icon: "title",
        text: "Rename this page",
        disabled: !options.changeTitle
      });

      result.push({
        click: "url",
        icon: "url",
        text: "Change URL",
        disabled: !options.changeSlug
      });

      result.push({
        click: "status",
        icon: "preview",
        text: "Publishing settings …",
        disabled: !options.changeStatus
      });

      result.push({
        click: "remove",
        icon: "trash",
        text: "Delete this page",
        disabled: !options.delete
      });

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
    return Api.patch(this.url(id, "slug"), { slug: slug });
  },
  title(id, title) {
    return Api.patch(this.url(id, "title"), { title: title });
  },
  status(id, status, position) {
    return Api.patch(this.url(id, "status"), {
      status: status,
      position: position
    });
  },
  states() {
    return {
      draft: {
        icon: "draft",
        label: "Draft",
        description:
          "The page is in draft-mode and only visible for logged in editors"
      },
      unlisted: {
        icon: "toggle-off",
        label: "Unlisted",
        description: "The page is only accessible via URL"
      },
      listed: {
        icon: "toggle-on",
        label: "Public",
        description: "The page is public for anyone"
      }
    };
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
