
import Vue from 'vue'

// Components
Object.keys(window.panel.plugins.components).forEach((name) => {
  let options = window.panel.plugins.components[name]
  Vue.component(name, options)
});

// Fields
import FieldMixin from 'Ui/Forms/Field/Field.mixin.js'

Object.keys(window.panel.plugins.fields).forEach((name) => {
  let options = window.panel.plugins.fields[name]

  if (options.mixins) {
    options.mixins.push(FieldMixin)
  } else {
    options.mixins = [FieldMixin]
  }

  Vue.component(name, options)
});

// Views
import { auth } from 'App/Routes/Routes.js'

Object.keys(window.panel.plugins.views).forEach((name) => {
  let options = window.panel.plugins.views[name]

  let route = options.path ? options : {
    name: 'Plugin' + name.charAt(0).toUpperCase() + name.slice(1),
    path: '/plugin/' + name,
    component: options,
    beforeEnter: auth
  }

  window.panel.plugins.routes.push(route)
});
