<template>
  <kirby-dialog ref="dialog" headline="Delete user" state="negative" button="Delete" @submit="submit">
    <kirby-txt>Do you really want to delete <strong>{{ user.email }}</strong>?</kirby-txt>
  </kirby-dialog>
</template>

<script>

// components
import DialogMixin from 'Dialogs/Dialog/Dialog.mixin.js';

// api
import UserQuery from '@/Api/UserQuery.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: {}
    }
  },
  methods: {
    open(email) {
      UserQuery(email).then(function (user) {
        this.user = user;
        this.$refs.dialog.open();
      }.bind(this));
    },
    submit () {
      this.$store.dispatch('success', 'The user has been deleted');

      if (this.$route.name === 'User') {
        this.$router.push('/users');
      }

    }
  }
}

</script>
