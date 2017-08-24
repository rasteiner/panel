import Vue from 'vue'

import Autocomplete from 'Forms/Autocomplete/Autocomplete.vue'
import Calendar from 'Forms/Calendar/Calendar.vue'
import Field from 'Forms/Field/Field.vue'
import Fieldset from 'Forms/Fieldset/Fieldset.vue'
import Input from 'Forms/Input/Input.vue'
import Blocks from 'Forms/Blocks/Blocks.vue'

import 'Forms/Inputs/Inputs.js';
import 'Forms/Fields/Fields.js';

Vue.component('kirby-autocomplete', Autocomplete);
Vue.component('kirby-calendar', Calendar);
Vue.component('kirby-field', Field);
Vue.component('kirby-fieldset', Fieldset);
Vue.component('kirby-input', Input);
Vue.component('kirby-blocks', Blocks);

