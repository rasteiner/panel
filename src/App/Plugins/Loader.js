import Vue from "vue";

// Helper function to add components to Vuew
window.panel.registerComponent = (name, component) => {
  if (Vue.options.components[name]) {
    console.warn(`Plugin is replacing "${name}"`);
  }

  Vue.component(name, component);
};

// Components
Object.keys(window.panel.plugins.components).forEach(name => {
  window.panel.registerComponent(name, window.panel.plugins.components[name]);
});

// Fields
import * as Mixins from "../../Ui/Forms/Field/Mixins";

Object.keys(window.panel.plugins.fields).forEach(name => {
  let options = window.panel.plugins.fields[name];

  if (!options.template) {
    panel.error(
      "Broken plugin field",
      `No template provided when loading plugin field "${name}". The field has not been registered.`
    );
    return;
  }

  // make sure mixin key exists
  if (!options.mixins) {
    options.mixins = [];
  }

  // convert prop mixins & inject Field mixin
  options.mixins = options.mixins.map(mixin => {
    return typeof mixin === "string" ? Mixins[mixin] : mixin;
  });
  options.mixins.unshift(Mixins.Field);

  window.panel.registerComponent(name, options);
});

// Views
import { auth } from "App/Routes/Routes.js";

Object.keys(window.panel.plugins.views).forEach(name => {
  let options = window.panel.plugins.views[name];

  // Handle whether only component or whole
  // route options have been registered
  if (!options.component) {
    if (!options.template) {
      panel.error(
        "Broken plugin view",
        `Neither component nor template provided when loading plugin view "${name}". The view has not been registered.`
      );
      return;
    }

    options = {
      component: options
    };
  }

  // Set path, if none was registered
  if (!options.path) {
    options.path = "/plugin/" + name;
  }

  // Set auth as default guard, if none was registered
  if (!options.beforeEnter) {
    options.beforeEnter = auth;
  }

  window.panel.plugins.routes.push(options);
});

// Menu Buttons
Object.keys(window.panel.plugins.menuItems).forEach(name => {
  // Link fallback
  if (!window.panel.plugins.menuItems[name].link) {
    window.panel.plugins.menuItems[name].link = "/plugin/" + name;
  }

  // Label fallback
  if (!window.panel.plugins.menuItems[name].label) {
    window.panel.plugins.menuItems[name].label =
      name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Icon fallback
  if (!window.panel.plugins.menuItems[name].icon) {
    window.panel.plugins.menuItems[name].icon = "page";
  }
});
