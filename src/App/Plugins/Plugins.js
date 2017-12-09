
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
window.panel.view = (name, options) => {

  let route = options.path ? options : {
    path: '/plugin/' + name,
    component: options
  }

  panel.vue.$router.addRoutes([route])
}
