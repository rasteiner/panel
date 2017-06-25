<template>

  <kirby-view class="kirby-users-view">

    <kirby-header 
      :breadcrumb="[
        {
          icon: 'user',
          link: '/users',
          label: 'Users'
        }
      ]">

      All Users

      <template slot="buttons-left">
        <kirby-button icon="plus" @click="$refs.create.open()">Add new user</kirby-button>
      </template>

      <template slot="buttons-right">
        <kirby-button icon="search">Search</kirby-button>
      </template>

    </kirby-header>    

    <kirby-users />

    <kirby-user-create-dialog ref="create" />

  </kirby-view>
    
</template>

<script>

import Button from '../../Buttons/Button/Button.vue';
import Header from '../../Layout/Header/Header.vue';
import View from '../../Layout/View/View.vue';
import Users from '../../Data/Users/Users.vue';
import UserCreateDialog from '../../Dialogs/User/UserCreateDialog/UserCreateDialog.vue';

export default {
  components: {
    'kirby-header': Header,
    'kirby-button': Button,
    'kirby-users': Users,
    'kirby-view': View,
    'kirby-user-create-dialog': UserCreateDialog
  },
  props: []
}

</script>