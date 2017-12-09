
import Vue from 'vue'

// General components
window.panel.component = (name, options) => {
  Vue.component(name, options)
}

// Fields
import FieldMixin from 'Ui/Forms/Field/Field.mixin.js'

window.panel.field = (name, options) => {
  if (options.mixins) {
    options.mixins.push(FieldMixin)
  } else {
    options.mixins = [FieldMixin]
  }
  panel.component(`kirby-${name}-field`, options)
}

// Sections
window.panel.section = (name, options) => {
  panel.component(`kirby-${name}-section`, options)
}

// Views
import { auth } from 'App/Routes/Routes.js'

window.panel.view = (name, options) => {

  let route = options.path ? options : {
    name: 'Plugin' + name.charAt(0).toUpperCase() + name.slice(1),
    path: '/plugin/' + name,
    component: options,
    beforeEnter: auth
  }

  panel.vue.$router.addRoutes([route])
}
