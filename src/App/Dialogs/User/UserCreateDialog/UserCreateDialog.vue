<template>
  <kirby-dialog ref="dialog" headline="Create a new user" state="positive" button="Create" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="create" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      user: {
        email: '',
        password: '',
        role: 'admin'
      },
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
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
      ]
    };
  },
  methods: {
    create () {

      this.$api.user.create(this.user).then((user) => {

        this.user = {
          email: '',
          password: '',
          role: 'admin'
        };

        this.$store.dispatch('success', 'The user has been created');
        this.$emit('success');
        this.$refs.dialog.close();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    }
  }
}

</script>
