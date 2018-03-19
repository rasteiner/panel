import Api from "./Api.js";

export default {
  list() {
    return Api.get("roles");
  },
  get(name) {
    return Api.get("roles/" + name);
  }
};
