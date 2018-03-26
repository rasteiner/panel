import Vue from "vue";

import Dropdown from "./Dropdown/Dropdown.vue";
import DropdownContent from "./Dropdown/DropdownContent.vue";
import DropdownItem from "./Dropdown/DropdownItem.vue";
import Pagination from "./Pagination/Pagination.vue";

Vue.component("kirby-dropdown", Dropdown);
Vue.component("kirby-dropdown-content", DropdownContent);
Vue.component("kirby-dropdown-item", DropdownItem);
Vue.component("kirby-pagination", Pagination);
