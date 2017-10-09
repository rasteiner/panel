<template>
  <kirby-dialog ref="dialog" state="positive" icon="check" button="Change" @submit="submit">
    <kirby-fieldset :fields="[
      {
        name: 'password',
        label: 'New password',
        type: 'password',
        required: true
      },
      {
        name: 'passwordConfirmation',
        label: 'Confirm the new password …',
        type: 'password',
        required: true
      },
    ]" />
  </kirby-dialog>
</template>

<script>

// components
import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import User from 'App/Api/User.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: {}
    }
  },
  methods: {
    open(email) {
      User.get(email).then((user) => {
        this.user = user;
        this.$refs.dialog.open();
      });
    },
    submit () {
      this.$store.dispatch('success', 'The password has been changed');
    }
  }
}

</script>
