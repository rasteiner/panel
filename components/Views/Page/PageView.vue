<template>

  <kirby-view>

    <kirby-header label="Page List" link="/"
      :icon="icon"
      :breadcrumb="breadcrumb"
      :pagination="pagination">

      {{ headline }}

      <template slot="buttons-left">
        <kirby-button icon="play-circle">Preview</kirby-button>
        <kirby-button icon="toggle-on">Draft</kirby-button>
        <kirby-dropdown>
          <kirby-button @click="$refs.settings.toggle()" icon="cog">Settings</kirby-button>
          <kirby-dropdown-content :dark="true" ref="settings">
            <kirby-dropdown-item icon="clipboard">Copy</kirby-dropdown-item>
            <kirby-dropdown-item icon="google">SEO</kirby-dropdown-item>
            <kirby-dropdown-item icon="code">Change Template</kirby-dropdown-item>
            <kirby-dropdown-item icon="chain" @click="$refs.url.open()">Change URL</kirby-dropdown-item>
            <kirby-dropdown-item icon="trash" @click="$refs.remove.open()">Delete</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
      </template>

      <template slot="buttons-right">
        <kirby-languages></kirby-languages>
      </template>

    </kirby-header>

    <slot />

    <kirby-page-create-dialog ref="create"></kirby-page-create-dialog>
    <kirby-page-url-dialog ref="url"></kirby-page-url-dialog>
    <kirby-page-remove-dialog ref="remove"></kirby-page-remove-dialog>

  </kirby-view>

</template>

<script>

import View from 'Layout/View/View.vue';
import Header from 'Layout/Header/Header.vue';
import Button from 'Buttons/Button/Button.vue';
import Dropdown from 'Navigation/Dropdown/Dropdown.vue';
import DropdownContent from 'Navigation/Dropdown/DropdownContent.vue';
import DropdownItem from 'Navigation/Dropdown/DropdownItem.vue';
import Languages from 'Navigation/Languages/Languages.vue';
import PageCreateDialog from 'Dialogs/Page/PageCreateDialog/PageCreateDialog.vue';
import PageUrlDialog from 'Dialogs/Page/PageUrlDialog/PageUrlDialog.vue';
import PageRemoveDialog from 'Dialogs/Page/PageRemoveDialog/PageRemoveDialog.vue';

import Query from '@api/Query.js';

export default {
  components: {
    'kirby-view': View,
    'kirby-header': Header,
    'kirby-button': Button,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-languages': Languages,
    'kirby-page-create-dialog': PageCreateDialog,
    'kirby-page-url-dialog': PageUrlDialog,
    'kirby-page-remove-dialog': PageRemoveDialog
  },
  props: [
    'page'
  ],
  data() {
    return {
      icon: 'file-o',
      breadcrumb: [],
      pagination: {},
      headline: ''
    }
  },
  created() {

    let params = {
      id: {
        type: 'String',
        value: this.page
      }
    };

    let select = `
      title
    `;

    Query('page', params, select).then(function (page) {
      this.headline = page.title;
    }.bind(this));

  }
}

</script>
