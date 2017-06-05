import Vue from 'vue'
import VueRouter from 'vue-router'

import Icon from './components/Icon/Icon.vue'
import Image from './components/Image/Image.vue'
import Button from './components/Button/Button.vue'
import Dropdown from './components/Dropdown/Dropdown.vue'
import DropdownContent from './components/Dropdown/DropdownContent.vue'
import DropdownItem from './components/Dropdown/DropdownItem.vue'
import Breadcrumb from './components/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './components/Breadcrumb/BreadcrumbItem.vue'
import Languages from './components/Languages/Languages.vue'
import Buttons from './components/Buttons/Buttons.vue'
import Dialog from './components/Dialog/Dialog.vue'
import Txt from './components/Txt/Txt.vue'
import Bar from './components/Bar/Bar.vue'
import ActionBar from './components/ActionBar/ActionBar.vue'
import TopBar from './components/TopBar/TopBar.vue'
import Grid from './components/Grid/Grid.vue'
import Column from './components/Grid/Column.vue'
import Calendar from './components/Calendar/Calendar.vue'
import Select from './components/Select/Select.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: []
});

new Vue({
  el: 'main',
  router,
  components: {
    'panel-icon': Icon,
    'panel-image': Image,
    'panel-button': Button,
    'panel-buttons': Buttons,
    'panel-dropdown': Dropdown,
    'panel-dropdown-content': DropdownContent,
    'panel-dropdown-item': DropdownItem,
    'panel-breadcrumb': Breadcrumb,
    'panel-breadcrumb-item': BreadcrumbItem,
    'panel-languages': Languages,
    'panel-dialog': Dialog,
    'panel-txt': Txt,
    'panel-bar': Bar,
    'panel-action-bar': ActionBar,
    'panel-top-bar': TopBar,
    'panel-grid': Grid,
    'panel-column': Column,
    'panel-calendar': Calendar,
    'panel-select': Select
  }
});
