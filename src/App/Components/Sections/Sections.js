import Vue from "vue";

import Sections from "./Sections.vue";
import PagesSection from "./Pages/PagesSection.vue";
import FilesSection from "./Files/FilesSection.vue";
import FieldsSection from "./Fields/FieldsSection.vue";

Vue.component("kirby-sections", Sections);
Vue.component("kirby-pages-section", PagesSection);
Vue.component("kirby-files-section", FilesSection);
Vue.component("kirby-fields-section", FieldsSection);
