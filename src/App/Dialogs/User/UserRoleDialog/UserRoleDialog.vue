<template>
  <kirby-dialog ref="dialog" size="medium" headline="Change the user's role" state="positive" button="Change role" @submit="submit">

    <kirby-fieldset :fields="[
      {
        name: 'role',
        label: 'Select a new role',
        type: 'radio',
        required: true,
        options: [
          {
            value: 'admin',
            text: 'Admin',
            info: 'All rights granted.'
          },
          {
            value: 'editor',
            text: 'Editor',
            info: 'User can edit but not adjust settings or manage users themself.'
          },
          {
            value: 'visitor',
            text: 'Visitor',
            info: 'No rights (ideal for frontend users).'
          }
        ]
      }
    ]" :values="values" />

  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import User from 'App/Api/User.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      id: null,
      values: {
        role: null
      }
    }
  },
  methods: {
    open(id) {
      this.id = id;
      User.get(id).then((user) => {
        this.values.role = user.role;
        this.$refs.dialog.open();
      });
    },
    submit () {
      User.update(this.id, {role: this.values.role}).then(() => {
        this.$store.dispatch('success', 'The role has been changed');
        this.$emit('success');
        this.$refs.dialog.close();
      });
    }
  }
}

</script>
