<template>
  <kirby-dialog ref="dialog" headline="Delete user" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>Do you really want to delete <strong>{{ user.id }}</strong>?</kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      user: {
        content: {}
      }
    }
  },
  methods: {
    open(id) {
      this.$api.user.get(id).then((user) => {
        this.user = user;
        this.$refs.dialog.open();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    },
    submit () {

      this.$api.user.delete(this.user.id).then(() => {
        this.$store.dispatch('success', 'The user has been deleted');
        this.$emit('success');
        this.$refs.dialog.close();

        if (this.$route.name === 'User') {
          this.$router.push('/users');
        }
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });

    }
  }
}

</script>
