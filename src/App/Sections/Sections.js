import Vue from 'vue'

import PagesSection from './Pages/PagesSection.vue'
import BlueprintsSection from './Blueprints/BlueprintsSection.vue'
import FilesSection from './Files/FilesSection.vue'
import FieldsSection from './Fields/FieldsSection.vue'

Vue.component('kirby-blueprints-section', BlueprintsSection);
Vue.component('kirby-pages-section', PagesSection);
Vue.component('kirby-files-section', FilesSection);
Vue.component('kirby-fields-section', FieldsSection);
