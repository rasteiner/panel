
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

  // Inject FieldMixin, depending on whether other
  // mixins are already defined
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

  // Handle whether only component or whole
  // route options have been registered
  if (!options.component) {
    options = {
      component: options
    }
  }

  // Set path, if none was registered
  if (!options.path) {
    options.path = '/plugin/' + name
  }

  // Set auth as default guard, if none was registered
  if (!options.beforeEnter) {
    options.beforeEnter = auth
  }

  window.panel.plugins.routes.push(options)
});