window.panel.plugins = {
  components: {},
  fields: {},
  views: {},
  menuButtons: {},
  routes: []
};

window.panel.plugin = (type, name, options) => {
  window.panel.plugins[type + "s"][name] = options;
};

window.panel.component = (name, options) => {
  panel.plugin("component", name, options);
};

window.panel.field = (name, options) => {
  panel.plugin("field", `kirby-${name}-field`, options);
};

window.panel.section = (name, options) => {
  panel.plugin("component", `kirby-${name}-section`, options);
};

window.panel.view = (name, options) => {
  panel.plugin("view", name, options);
};

window.panel.menuButton = (name, options) => {
  panel.plugin("menuButton", name, options);
};
