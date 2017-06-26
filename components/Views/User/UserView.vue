<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="user" link="/"
      :breadcrumb="[
        {
          link: '/users/' + user.role,
          label: user.role + 's'
        },
      ]"
      :pagination="{
        page: 1, 
        limit: 1, 
        total: 5
      }">

      {{ user.username }}
      <kirby-image class="kirby-user-view-image" ratio="1/1" :src="user.image.url" />
    
      <template slot="buttons-left">
        <kirby-dropdown>
          <kirby-button @click="$refs.picture.toggle()" icon="file-image-o">Picture</kirby-button>
          <kirby-dropdown-content ref="picture" :dark="true">
            <kirby-dropdown-item icon="cloud-upload" :upload="true">Change</kirby-dropdown-item>
            <kirby-dropdown-item icon="trash-o">Delete</kirby-dropdown-item>
          </kirby-dropdown-content>
        </kirby-dropdown>
        <kirby-button icon="bolt">Role</kirby-button>
        <kirby-button icon="key">Password</kirby-button>
        <kirby-button icon="trash-o" @click="$refs.remove.open(user.username)">Delete</kirby-button>
      </template>

    </kirby-header>    

    <kirby-fieldset :fields="[
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        width: '1/2'
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        width: '1/2'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email'
      },
      {
        name: 'website',
        label: 'Website',
        type: 'url'
      }
    ]" :values="user" />

    <kirby-user-remove-dialog ref="remove" />

  </kirby-view>
    
</template>

<script>

// api
import UserQuery from '../../../api/User.js';

// components
import Bar from '../../Bars/Bar/Bar.vue';
import Button from '../../Buttons/Button/Button.vue';
import Breadcrumb from '../../Navigation/Breadcrumb/Breadcrumb.vue';
import BreadcrumbItem from '../../Navigation/Breadcrumb/BreadcrumbItem.vue';
import Dropdown from '../../Navigation/Dropdown/Dropdown.vue';
import DropdownContent from '../../Navigation/Dropdown/DropdownContent.vue';
import DropdownItem from '../../Navigation/Dropdown/DropdownItem.vue';
import Image from '../../Images/Image/Image.vue';
import Icon from '../../Images/Icon/Icon.vue';
import Header from '../../Layout/Header/Header.vue';
import View from '../../Layout/View/View.vue';
import Fieldset from '../../Forms/Fieldset/Fieldset.vue';
import UserRemoveDialog from '../../Dialogs/User/UserRemoveDialog/UserRemoveDialog.vue';

export default {
  components: {
    'kirby-header': Header,
    'kirby-image': Image,
    'kirby-icon': Icon,
    'kirby-button': Button,
    'kirby-fieldset': Fieldset,
    'kirby-view': View,
    'kirby-bar': Bar,
    'kirby-breadcrumb': Breadcrumb,
    'kirby-breadcrumb-item': BreadcrumbItem,
    'kirby-dropdown': Dropdown,
    'kirby-dropdown-content': DropdownContent,
    'kirby-dropdown-item': DropdownItem,
    'kirby-user-remove-dialog': UserRemoveDialog
  },
  props: ['username'],
  data () {
    return {
      user: {
        username: '',
        email: '',
        website: '',
        image: {
          url: ''
        }
      }
    }
  },
  created () {
    UserQuery(this.username).then(function(user) {
      this.user = user;
    }.bind(this));
  }
}

</script>

<style lang="scss">

.kirby-headline {
  position: relative;
}

.kirby-user-view-image {
  position: absolute;
  width: 3rem;
  right: 0;
  top: 50%;
  margin-top: -1.5rem;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: -.2rem;
}

</style>