import Vue from "vue";
import Shortcuts from "./Shortcuts.js";

export default {
  install(Vue) {
    Vue.prototype.$events = new Vue({
      created() {
        window.addEventListener("keydown", Shortcuts.bind(this), false);
      },
      destroyed() {
        window.removeEventListener("keydown", Shortcuts, false);
      }
    });
  }
};
