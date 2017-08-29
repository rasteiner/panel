import Vue from 'vue'

import Breadcrumb from './Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './Breadcrumb/BreadcrumbItem.vue'
import Dropdown from './Dropdown/Dropdown.vue'
import DropdownContent from './Dropdown/DropdownContent.vue'
import DropdownItem from './Dropdown/DropdownItem.vue'
import Menu from './Menu/Menu.vue'
import Pagination from './Pagination/Pagination.vue'

Vue.component('kirby-breadcrumb', Breadcrumb);
Vue.component('kirby-breadcrumb-item', BreadcrumbItem);
Vue.component('kirby-dropdown', Dropdown);
Vue.component('kirby-dropdown-content', DropdownContent);
Vue.component('kirby-dropdown-item', DropdownItem);
Vue.component('kirby-menu', Menu);
Vue.component('kirby-pagination', Pagination);
