import Vue from 'vue'

import Breadcrumb from 'Navigation/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from 'Navigation/Breadcrumb/BreadcrumbItem.vue'
import Dropdown from 'Navigation/Dropdown/Dropdown.vue'
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue'
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue'
import Languages from 'Navigation/Languages/Languages.vue'
import Pagination from 'Navigation/Pagination/Pagination.vue'
import PageSelector from 'Navigation/Selector/PageSelector/PageSelector.vue'

Vue.component('kirby-breadcrumb', Breadcrumb);
Vue.component('kirby-breadcrumb-item', BreadcrumbItem);
Vue.component('kirby-dropdown', Dropdown);
Vue.component('kirby-dropdown-content', DropdownContent);
Vue.component('kirby-dropdown-item', DropdownItem);
Vue.component('kirby-languages', Languages);
Vue.component('kirby-pagination', Pagination);
Vue.component('kirby-page-selector', PageSelector);
