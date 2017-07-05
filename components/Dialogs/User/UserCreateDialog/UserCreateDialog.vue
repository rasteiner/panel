<template>
  <kirby-dialog ref="dialog" headline="Create a new user" state="positive" button="Create">
    <kirby-fieldset :fields="[
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        name: 'password',
        label: 'Password',
        type: 'text',
        required: true
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
          {value: 'admin', text: 'Admin'},
          {value: 'editor', text: 'Editor'},
        ]
      }
    ]" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin]
}

</script>
