window.panel.plugins = {
  components: {},
  fields: {},
  views: {},
  menuItems: {},
  routes: []
};

window.panel.plugin = (type, name, options) => {
  window.panel.plugins[type + "s"][name] = options;
};

window.panel.component = (name, options) => {
  window.panel.plugin("component", name, options);
};

window.panel.field = (name, options) => {
  window.panel.plugin("field", `kirby-${name}-field`, options);
};

window.panel.section = (name, options) => {
  window.panel.plugin("component", `kirby-${name}-section`, options);
};

window.panel.view = (name, options) => {
  window.panel.plugin("view", name, options);
};

window.panel.menuItem = (name, options = {}) => {
  window.panel.plugin("menuItem", name, options);
};
