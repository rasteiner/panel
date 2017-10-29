<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Create" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="create" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'App/Dialogs/Dialogs.mixin.js';

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
          type: 'radio',
          required: true,
          options: this.$api.user.roles()
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

        this.success({
          message: 'The user has been created',
          event: 'user.create'
        });

      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    }
  }
}

</script>
