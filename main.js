import Vue from 'vue'
import VueRouter from 'vue-router'

/** Bars **/
import Bar from './components/Bars/Bar/Bar.vue'

/** Buttons **/
import Button from './components/Buttons/Button/Button.vue'
import ButtonGroup from './components/Buttons/ButtonGroup/ButtonGroup.vue'
import Tag from './components/Buttons/Tag/Tag.vue'

/** Data */
import Pages from './components/Data/Pages/Pages.vue';
import Files from './components/Data/Files/Files.vue';

/** Dialogs **/
import Dialog from './components/Dialogs/Dialog/Dialog.vue'

/** Forms **/
import Autocomplete from './components/Forms/Autocomplete/Autocomplete.vue'
import Calendar from './components/Forms/Calendar/Calendar.vue'
import Field from './components/Forms/Field/Field.vue'
import Fieldset from './components/Forms/Fieldset/Fieldset.vue'
import Input from './components/Forms/Input/Input.vue'

/** Forms/Inputs **/
import DateInput from './components/Forms/Inputs/DateInput/DateInput.vue'
import SelectInput from './components/Forms/Inputs/SelectInput/SelectInput.vue'
import TextareaInput from './components/Forms/Inputs/TextareaInput/TextareaInput.vue'
import TagsInput from './components/Forms/Inputs/TagsInput/TagsInput.vue'
import NumberInput from './components/Forms/Inputs/NumberInput/NumberInput.vue'

/** Forms/Fields **/
import DateField from './components/Forms/Fields/DateField/DateField.vue'
import TextField from './components/Forms/Fields/TextField/TextField.vue'
import TextareaField from './components/Forms/Fields/TextareaField/TextareaField.vue'
import TagsField from './components/Forms/Fields/TagsField/TagsField.vue'
import EmailField from './components/Forms/Fields/EmailField/EmailField.vue'
import NumberField from './components/Forms/Fields/NumberField/NumberField.vue'
import UrlField from './components/Forms/Fields/UrlField/UrlField.vue'
import TelField from './components/Forms/Fields/TelField/TelField.vue'
import SelectField from './components/Forms/Fields/SelectField/SelectField.vue'
import TableField from './components/Forms/Fields/TableField/TableField.vue'

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
import Cards from './components/Layout/Cards/Cards.vue'
import Grid from './components/Layout/Grid/Grid.vue'
import Column from './components/Layout/Grid/Column.vue'

/** Table **/
import Table from './components/Layout/Table/Table.vue';
import TableRow from './components/Layout/Table/TableRow.vue';
import TableCell from './components/Layout/Table/TableCell.vue';
import TableHeader from './components/Layout/Table/TableHeader.vue';
import TableHeaderCell from './components/Layout/Table/TableHeaderCell.vue';
import TableBody from './components/Layout/Table/TableBody.vue';

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

    /** Buttons **/
    'kirby-button': Button,
    'kirby-button-group': ButtonGroup,
    'kirby-tag': Tag,

    /** Data **/
    'kirby-pages': Pages,
    'kirby-files': Files,

    /** Dialogs **/
    'kirby-dialog': Dialog,

    /** Forms **/
    'kirby-autocomplete': Autocomplete,
    'kirby-calendar': Calendar,
    'kirby-field': Field,
    'kirby-fieldset': Fieldset,
    'kirby-input': Input,

    /** Form/Inputs */
    'kirby-date-input': DateInput,
    'kirby-select-input': SelectInput,
    'kirby-textarea-input': TextareaInput,
    'kirby-tags-input': TagsInput,
    'kirby-number-input': NumberInput,

    /** Form/Fields */
    'kirby-date-field': DateField,
    'kirby-tags-field': TagsField,
    'kirby-text-field': TextField,
    'kirby-textarea-field': TextareaField,
    'kirby-email-field': EmailField,
    'kirby-number-field': NumberField,
    'kirby-url-field': UrlField,
    'kirby-tel-field': TelField,
    'kirby-select-field': SelectField,
    'kirby-table-field': TableField,

    /** Images **/
    'kirby-icon': Icon,
    'kirby-image': Image,

    /** Layout **/
    'kirby-card': Card,
    'kirby-cards': Cards,
    'kirby-box': Box,
    'kirby-grid': Grid,
    'kirby-column': Column,
    
    /** Table **/
    'kirby-table': Table,
    'kirby-table-row': TableRow,
    'kirby-table-cell': TableCell,
    'kirby-table-header': TableHeader,
    'kirby-table-header-cell': TableHeaderCell,
    'kirby-table-body': TableBody,
     
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
