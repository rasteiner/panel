<template>

  <kirby-view class="kirby-user-view">

    <kirby-header icon="user" link="/"
      :breadcrumb="[
        {
          link: '/users/admin',
          label: 'Admins'
        },
      ]"
      :pagination="{
        page: 1, 
        limit: 1, 
        total: 5
      }">
    
      <kirby-bar>
        <template slot="left">bastian</template>
        <template slot="right">
          <kirby-image class="kirby-user-view-image" ratio="1/1" src="/mock/images/users/bastian.jpg" />
        </template>
      </kirby-bar>

      <template slot="buttons-left">
        <kirby-button icon="file-image-o">Picture</kirby-button>
        <kirby-button icon="bolt">Role</kirby-button>
        <kirby-button icon="key">Password</kirby-button>
        <kirby-button icon="trash-o" @click="$refs.remove.open()">Delete</kirby-button>
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
      }

    ]" :values="{
      'username': 'bastian',
      'firstName': 'Bastian',
      'lastName': 'Allgeier',
      'email': 'mail@bastianallgeier.com'
    }" />

    <kirby-user-remove-dialog ref="remove" />

  </kirby-view>
    
</template>

<script>

import Bar from '../../Bars/Bar/Bar.vue';
import Button from '../../Buttons/Button/Button.vue';
import Breadcrumb from '../../Navigation/Breadcrumb/Breadcrumb.vue';
import BreadcrumbItem from '../../Navigation/Breadcrumb/BreadcrumbItem.vue';
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
    'kirby-user-remove-dialog': UserRemoveDialog
  },
  props: []
}

</script>

<style lang="scss">

.kirby-user-view-image {
  width: 3rem;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: -.2rem;
}

</style>