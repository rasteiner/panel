import Vue from 'vue'
import VueRouter from 'vue-router'

/** Bars **/
import Bar from './components/Bars/Bar/Bar.vue'
import TopBar from './components/Bars/TopBar/TopBar.vue'
import ActionBar from './components/Bars/ActionBar/ActionBar.vue'

/** Buttons **/
import Button from './components/Buttons/Button/Button.vue'
import ButtonGroup from './components/Buttons/ButtonGroup/ButtonGroup.vue'
import Tag from './components/Buttons/Tag/Tag.vue'

/** Dialogs **/
import Dialog from './components/Dialogs/Dialog/Dialog.vue'

/** Forms **/
import Autocomplete from './components/Forms/Autocomplete/Autocomplete.vue'
import Calendar from './components/Forms/Calendar/Calendar.vue'
import Field from './components/Forms/Field/Field.vue'

/** Forms/Inputs **/
import Date from './components/Forms/Inputs/Date/Date.vue'
import InputContainer from './components/Forms/Inputs/InputContainer/InputContainer.vue'
import Select from './components/Forms/Inputs/Select/Select.vue'
import Textarea from './components/Forms/Inputs/Textarea/Textarea.vue'
import Tags from './components/Forms/Inputs/Tags/Tags.vue'
import Number from './components/Forms/Inputs/Number/Number.vue'

/** Images **/
import Icon from './components/Images/Icon/Icon.vue'
import Image from './components/Images/Image/Image.vue'

/** Navigation **/
import Breadcrumb from './components/Navigation/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './components/Navigation/Breadcrumb/BreadcrumbItem.vue'
import Dropdown from './components/Navigation/Dropdown/Dropdown.vue'
import DropdownContent from './components/Navigation/Dropdown/DropdownContent.vue'
import DropdownItem from './components/Navigation/Dropdown/DropdownItem.vue'
import Languages from './components/Navigation/Languages/Languages.vue'

/** Layout **/
import Box from './components/Layout/Box/Box.vue'
import Card from './components/Layout/Card/Card.vue'
import Grid from './components/Layout/Grid/Grid.vue'
import Column from './components/Layout/Grid/Column.vue'

/** Text **/
import Headline from './components/Text/Headline/Headline.vue'
import Txt from './components/Text/Txt/Txt.vue'

/** Sandbox **/
import Sandbox from './components/Sandbox/Sandbox.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: []
});

new Vue({
  el: 'main',
  router,
  components: {

    /** Bars **/
    'kirby-bar': Bar,
    'kirby-top-bar': TopBar,
    'kirby-action-bar': ActionBar,

    /** Buttons **/
    'kirby-button': Button,
    'kirby-button-group': ButtonGroup,
    'kirby-tag': Tag,

    /** Dialogs **/
    'kirby-dialog': Dialog,

    /** Forms **/
    'kirby-autocomplete': Autocomplete,
    'kirby-calendar': Calendar,
    'kirby-field': Field,

    /** Form/Inputs */
    'kirby-date': Date,
    'kirby-input-container': InputContainer,
    'kirby-select': Select,
    'kirby-textarea': Textarea,
    'kirby-tags': Tags,
    'kirby-number': Number,

    /** Images **/
    'kirby-icon': Icon,
    'kirby-image': Image,

    /** Layout **/
    'kirby-card': Card,
    'kirby-box': Box,
    'kirby-grid': Grid,
    'kirby-column': Column,
    
    /** Navigation **/
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-languages': Languages,

    /** Text **/
    'kirby-headline': Headline,
    'kirby-txt': Txt,

    /** Sandbox **/
    'kirby-sandbox': Sandbox

  }
});
