import Api from "./Api.js";

export default {
  info() {
    return Api.get("system");
  },
  install(user) {
    return Api.post("system/install", user);
  }
};
