import Api from "./Api.js";

export default {
  list() {
    return Api.get("locales");
  },
  get(locale) {
    return Api.get("locales/" + locale);
  }
};
