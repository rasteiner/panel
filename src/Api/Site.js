import Api from "./Api.js";

export default {
  get(query) {
    return Api.get("site", query);
  },
  update(id, data) {
    return Api.post("site", data);
  },
  children(query) {
    return Api.post("site/children/search", query);
  },
  blueprint() {
    return Api.get("site/blueprint");
  },
  blueprints() {
    return Api.get("site/blueprints");
  }
};
