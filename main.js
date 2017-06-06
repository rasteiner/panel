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
import Card from './components/Card/Card.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: []
});

new Vue({
  el: 'main',
  router,
  components: {
    'kirby-icon': Icon,
    'kirby-image': Image,
    'kirby-button': Button,
    'kirby-buttons': Buttons,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-languages': Languages,
    'kirby-dialog': Dialog,
    'kirby-txt': Txt,
    'kirby-bar': Bar,
    'kirby-action-bar': ActionBar,
    'kirby-top-bar': TopBar,
    'kirby-grid': Grid,
    'kirby-column': Column,
    'kirby-calendar': Calendar,
    'kirby-select': Select,
    'kirby-card': Card
  }
});
