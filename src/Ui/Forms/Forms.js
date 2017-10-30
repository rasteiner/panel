import Vue from 'vue'

import Autocomplete from './Autocomplete/Autocomplete.vue'
import Field from './Field/Field.vue'
import Fieldset from './Fieldset/Fieldset.vue'
import Form from './Form/Form.vue'
import Input from './Input/Input.vue'
import Upload from './Upload/Upload.vue'

import './Inputs/Inputs.js';
import './Fields/Fields.js';

Vue.component('kirby-autocomplete', Autocomplete);
Vue.component('kirby-field', Field);
Vue.component('kirby-fieldset', Fieldset);
Vue.component('kirby-form', Form);
Vue.component('kirby-input', Input);
Vue.component('kirby-upload', Upload);

