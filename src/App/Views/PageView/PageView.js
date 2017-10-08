import Vue from 'vue'

import PageView from './PageView.vue';
import PageTemplateSelector from './PageTemplateSelector/PageTemplateSelector.vue';
import PageTemplateReview from './PageTemplateReview/PageTemplateReview.vue';


Vue.component('kirby-page-view', PageView);
Vue.component('kirby-page-template-selector', PageTemplateSelector);
Vue.component('kirby-page-template-review', PageTemplateReview);
