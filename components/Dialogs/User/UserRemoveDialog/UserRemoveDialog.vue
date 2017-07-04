<template>
  <kirby-dialog ref="dialog" headline="Delete user" state="negative" button="Delete">
    <kirby-txt>Do you really want to delete <strong>{{ user.username }}</strong>?</kirby-txt>
  </kirby-dialog>
</template>

<script>

// api
import UserQuery from '@api/User.js';

// components
import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: {}
    }
  },
  methods: {
    open(username) {

      UserQuery(username).then(function(user) {
        this.user = user;
        this.$refs.dialog.open();
      }.bind(this));

    }
  }
}

</script>
