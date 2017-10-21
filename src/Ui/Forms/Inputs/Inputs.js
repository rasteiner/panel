import Vue from 'vue'

import CheckboxInput from './CheckboxInput/CheckboxInput.vue'
import FancyInput from './FancyInput/FancyInput.vue'
import DateInput from './DateInput/DateInput.vue'
import RadioInput from './RadioInput/RadioInput.vue'
import SelectInput from './SelectInput/SelectInput.vue'
import TextInput from './TextInput/TextInput.vue'
import TextareaInput from './TextareaInput/TextareaInput.vue'
import TimeInput from './TimeInput/TimeInput.vue'

Vue.component('kirby-checkbox-input', CheckboxInput);
Vue.component('kirby-date-input', DateInput);
Vue.component('kirby-fancy-input', FancyInput);
Vue.component('kirby-radio-input', RadioInput);
Vue.component('kirby-select-input', SelectInput);
Vue.component('kirby-text-input', TextInput);
Vue.component('kirby-textarea-input', TextareaInput);
Vue.component('kirby-time-input', TimeInput);
