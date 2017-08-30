import Vue from 'vue'

/** Forms/Fields **/
import CheckboxField from './CheckboxField/CheckboxField.vue'
import DateField from './DateField/DateField.vue'
import EmailField from './EmailField/EmailField.vue'
import NumberField from './NumberField/NumberField.vue'
import PasswordField from './PasswordField/PasswordField.vue'
import SelectField from './SelectField/SelectField.vue'
import TableField from './TableField/TableField.vue'
import TagsField from './TagsField/TagsField.vue'
import TelField from './TelField/TelField.vue'
import TextareaField from './TextareaField/TextareaField.vue'
import TextField from './TextField/TextField.vue'
import UrlField from './UrlField/UrlField.vue'

Vue.component('kirby-checkbox-field', CheckboxField);
Vue.component('kirby-date-field', DateField);
Vue.component('kirby-email-field', EmailField);
Vue.component('kirby-number-field', NumberField);
Vue.component('kirby-password-field', PasswordField);
Vue.component('kirby-select-field', SelectField);
Vue.component('kirby-table-field', TableField);
Vue.component('kirby-tags-field', TagsField);
Vue.component('kirby-tel-field', TelField);
Vue.component('kirby-textarea-field', TextareaField);
Vue.component('kirby-text-field', TextField);
Vue.component('kirby-url-field', UrlField);
