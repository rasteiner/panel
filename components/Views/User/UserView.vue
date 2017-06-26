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

    // TODO: replace with GraphQL API
    fetch('/mock/data/users.json').then(function (response) {
      return response.json()
    }).then(function (json) {
      json.forEach(function(user) {
        if(user.username === this.username) {
          this.user = user;
        }
      }.bind(this)); 
    }.bind(this))

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