import Api from "./Api.js";

export default {
  list() {
    return Api.get("roles");
  },
  get(name) {
    return Api.get("roles/" + name);
  },
  options() {
    return this.list().then(roles => {
      return roles.data.map(role => {
        return {
          info: role.description || "(no description)",
          text: role.title,
          value: role.name
        };
      });
    });
  }
};
