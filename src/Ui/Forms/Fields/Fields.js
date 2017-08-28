import Vue from 'vue'

/** Forms/Fields **/
import DateField from './DateField/DateField.vue'
import TextField from './TextField/TextField.vue'
import TextareaField from './TextareaField/TextareaField.vue'
import TagsField from './TagsField/TagsField.vue'
import EmailField from './EmailField/EmailField.vue'
import NumberField from './NumberField/NumberField.vue'
import UrlField from './UrlField/UrlField.vue'
import TelField from './TelField/TelField.vue'
import SelectField from './SelectField/SelectField.vue'
import TableField from './TableField/TableField.vue'

Vue.component('kirby-date-field', DateField);
Vue.component('kirby-tags-field', TagsField);
Vue.component('kirby-text-field', TextField);
Vue.component('kirby-textarea-field', TextareaField);
Vue.component('kirby-email-field', EmailField);
Vue.component('kirby-number-field', NumberField);
Vue.component('kirby-url-field', UrlField);
Vue.component('kirby-tel-field', TelField);
Vue.component('kirby-select-field', SelectField);
Vue.component('kirby-table-field', TableField);
