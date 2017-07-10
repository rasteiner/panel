import Vue from 'vue'
import VueRouter from 'vue-router'

/** Bars **/
import Bar from 'Bars/Bar/Bar.vue'

/** Buttons **/
import Button from 'Buttons/Button/Button.vue'
import ButtonGroup from 'Buttons/ButtonGroup/ButtonGroup.vue'
import Tag from 'Buttons/Tag/Tag.vue'

/** Data */
import Pages from 'Data/Pages/Pages.vue';
import Files from 'Data/Files/Files.vue';
import Users from 'Data/Users/Users.vue';

/** Dialogs **/
import Dialog from 'Dialogs/Dialog/Dialog.vue'
import PageCreateDialog from 'Dialogs/Page/PageCreateDialog/PageCreateDialog.vue'
import PageRemoveDialog from 'Dialogs/Page/PageRemoveDialog/PageRemoveDialog.vue'
import PageUrlDialog from 'Dialogs/Page/PageUrlDialog/PageUrlDialog.vue'
import UserCreateDialog from 'Dialogs/User/UserCreateDialog/UserCreateDialog.vue'
import UserRemoveDialog from 'Dialogs/User/UserRemoveDialog/UserRemoveDialog.vue'

/** Forms **/
import Autocomplete from 'Forms/Autocomplete/Autocomplete.vue'
import Calendar from 'Forms/Calendar/Calendar.vue'
import Field from 'Forms/Field/Field.vue'
import Fieldset from 'Forms/Fieldset/Fieldset.vue'
import Input from 'Forms/Input/Input.vue'
import Blocks from 'Forms/Blocks/Blocks.vue'

/** Forms/Inputs **/
import DateInput from 'Forms/Inputs/DateInput/DateInput.vue'
import SelectInput from 'Forms/Inputs/SelectInput/SelectInput.vue'
import TextareaInput from 'Forms/Inputs/TextareaInput/TextareaInput.vue'
import TagsInput from 'Forms/Inputs/TagsInput/TagsInput.vue'
import NumberInput from 'Forms/Inputs/NumberInput/NumberInput.vue'

/** Forms/Fields **/
import DateField from 'Forms/Fields/DateField/DateField.vue'
import TextField from 'Forms/Fields/TextField/TextField.vue'
import TextareaField from 'Forms/Fields/TextareaField/TextareaField.vue'
import TagsField from 'Forms/Fields/TagsField/TagsField.vue'
import EmailField from 'Forms/Fields/EmailField/EmailField.vue'
import NumberField from 'Forms/Fields/NumberField/NumberField.vue'
import UrlField from 'Forms/Fields/UrlField/UrlField.vue'
import TelField from 'Forms/Fields/TelField/TelField.vue'
import SelectField from 'Forms/Fields/SelectField/SelectField.vue'
import TableField from 'Forms/Fields/TableField/TableField.vue'

/** Images **/
import Icon from 'Images/Icon/Icon.vue'
import Image from 'Images/Image/Image.vue'

/** Navigation **/
import Breadcrumb from 'Navigation/Breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from 'Navigation/Breadcrumb/BreadcrumbItem.vue'
import Dropdown from 'Navigation/Dropdown/Dropdown.vue'
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue'
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue'
import Languages from 'Navigation/Languages/Languages.vue'
import Pagination from 'Navigation/Pagination/Pagination.vue'

/** Selectors */
import PageSelector from 'Navigation/Selector/PageSelector/PageSelector.vue'

/** Layout **/
import Box from 'Layout/Box/Box.vue'
import Card from 'Layout/Card/Card.vue'
import Cards from 'Layout/Cards/Cards.vue'
import Grid from 'Layout/Grid/Grid.vue'
import Header from 'Layout/Header/Header.vue'
import Column from 'Layout/Grid/Column.vue'
import View from 'Layout/View/View.vue'

/** Table **/
import Table from 'Layout/Table/Table.vue';
import TableRow from 'Layout/Table/TableRow.vue';
import TableCell from 'Layout/Table/TableCell.vue';
import TableHeader from 'Layout/Table/TableHeader.vue';
import TableHeaderCell from 'Layout/Table/TableHeaderCell.vue';
import TableBody from 'Layout/Table/TableBody.vue';

/** Text **/
import Headline from 'Text/Headline/Headline.vue'
import Txt from 'Text/Txt/Txt.vue'

/** Views **/
import UsersView from 'Views/Users/UsersView.vue';
import UserView from 'Views/User/UserView.vue';

/** Sandbox **/
import Sandbox from 'Sandbox/Sandbox.vue'

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
    'kirby-users': Users,

    /** Dialogs **/
    'kirby-dialog': Dialog,
    'kirby-page-create-dialog': PageCreateDialog,
    'kirby-page-url-dialog': PageUrlDialog,
    'kirby-page-remove-dialog': PageRemoveDialog,
    'kirby-user-create-dialog': UserCreateDialog,
    'kirby-user-remove-dialog': UserRemoveDialog,

    /** Forms **/
    'kirby-autocomplete': Autocomplete,
    'kirby-calendar': Calendar,
    'kirby-field': Field,
    'kirby-fieldset': Fieldset,
    'kirby-input': Input,
    'kirby-blocks': Blocks,

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
    'kirby-header': Header,
    'kirby-column': Column,
    'kirby-view': View,
    
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
    'kirby-pagination': Pagination,

    /** Selector */
    'kirby-page-selector': PageSelector,

    /** Text **/
    'kirby-headline': Headline,
    'kirby-txt': Txt,

    /** Views */
    'kirby-users-view': UsersView,
    'kirby-user-view': UserView,

    /** Sandbox **/
    'kirby-sandbox': Sandbox

  }
});
