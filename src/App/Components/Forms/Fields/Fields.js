import Vue from "vue";

import CheckboxesField from "./CheckboxesField/CheckboxesField.vue";
import LanguageField from "./LanguageField/LanguageField.vue";
import RadioField from "./RadioField/RadioField.vue";
import SelectField from "./SelectField/SelectField.vue";
import TagsField from "./TagsField/TagsField.vue";
import UserField from "./UserField/UserField.vue";

Vue.component("kirby-checkboxes-field", CheckboxesField);
Vue.component("kirby-language-field", LanguageField);
Vue.component("kirby-radio-field", RadioField);
Vue.component("kirby-select-field", SelectField);
Vue.component("kirby-tags-field", TagsField);
Vue.component("kirby-user-field", UserField);
