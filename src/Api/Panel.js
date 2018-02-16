import Api from "./Api.js";

export default {
  system() {
    return Api.get("system");
  },
  options(type, data) {
    const params = Object.keys(data)
      .filter(key => data[key])
      .map(key => `${key}=${data[key]}`)
      .join("&");
    return Api.get("panel/options/" + type + "/?" + params);
  }
};
