import Vue from "vue";
import Api from "./Api.js";

export default {
  create(data) {
    return Api.post(this.url(), data);
  },
  list(query) {
    return Api.post(this.url(null, "search"), query);
  },
  get(id, query) {
    return Api.get(this.url(id), query);
  },
  update(id, data) {
    return Api.patch(this.url(id), data);
  },
  delete(id) {
    return Api.delete(this.url(id));
  },
  changeEmail(id, email) {
    return Api.patch(this.url(id, "email"), { email: email });
  },
  changeLanguage(id, language) {
    return Api.patch(this.url(id, "language"), { language: language });
  },
  changeName(id, name) {
    return Api.patch(this.url(id, "name"), { name: name });
  },
  changePassword(id, password) {
    return Api.patch(this.url(id, "password"), { password: password });
  },
  changeRole(id, role) {
    return Api.patch(this.url(id, "role"), { role: role });
  },
  deleteAvatar(id) {
    return Api.delete(this.url(id, "avatar"));
  },
  blueprint(id) {
    return Api.get(this.url(id, "blueprint"));
  },
  breadcrumb(user) {
    return [
      {
        link: "/users/role/" + user.role,
        label: Vue.i18n.translate("user.role").toLowerCase() + ":" + user.role
      },
      {
        link: "/users/" + user.id,
        label: user.email
      }
    ];
  },
  roles() {
    return [
      {
        value: "admin",
        text: "Admin",
        info: "All rights granted."
      },
      {
        value: "editor",
        text: "Editor",
        info: "User can edit but not adjust settings or manage users themself."
      },
      {
        value: "visitor",
        text: "Visitor",
        info: "No rights (ideal for frontend users)."
      }
    ];
  },
  options(id, view) {
    return Api.get(this.url(id, "options")).then(options => {
      let result = [];

      if (options.changeRole) {
        result.push({
          click: "role",
          icon: "bolt",
          text: "Change role"
        });
      }

      if (options.changePassword) {
        result.push({
          click: "password",
          icon: "key",
          text: "Change password"
        });
      }

      if (options.changeLanguage) {
        result.push({
          click: "language",
          icon: "globe",
          text: "Change language"
        });
      }

      if (options.delete) {
        result.push({
          click: "remove",
          icon: "trash",
          text: "Delete this user"
        });
      }

      return result;
    });
  },
  url(id, path) {
    let url = !id ? "users" : "users/" + id;

    if (path) {
      url += "/" + path;
    }

    return url;
  }
};
