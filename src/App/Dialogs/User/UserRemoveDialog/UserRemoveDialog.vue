<template>
  <kirby-dialog ref="dialog" headline="Delete user" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>Do you really want to delete <strong>{{ user.email }}</strong>?</kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      user: {}
    }
  },
  methods: {
    open(email) {
      this.$api.user.get(email).then((user) => {
        this.user = user;
        this.user.email = user.data.email;
        this.$refs.dialog.open();
      });
    },
    submit () {

      this.$api.user.delete(this.user.email).then(() => {
        this.$store.dispatch('success', 'The user has been deleted');
        this.$emit('success');
        this.$refs.dialog.close();

        if (this.$route.name === 'User') {
          this.$router.push('/users');
        }
      });

    }
  }
}

</script>
