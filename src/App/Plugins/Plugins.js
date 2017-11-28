
import Vue from 'vue';
import FieldMixin from 'Ui/Forms/Field/Field.mixin.js';

// General components
window.panel.component = (name, options) => {
  Vue.component(name, options)
}

// Fields
window.panel.field = (name, options) => {
  if (options.mixins) {
    options.mixins.push(FieldMixin);
  } else {
    options.mixins = [FieldMixin];
  }
  panel.component(`kirby-${name}-field`, options);
}

// Sections
window.panel.section = (name, options) => {
  panel.component(`kirby-${name}-section`, options);
}
