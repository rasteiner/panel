<template>
  <kirby-dialog ref="dialog" size="medium" headline="Change the user's role" state="positive" button="Change role" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="submit" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';

export default {
  mixins: [DialogMixin],
  data () {
    return {
      user: {
        id: null,
        role: 'visitor'
      }
    }
  },
  computed: {
    fields () {
      return [
        {
          name: 'role',
          label: 'Select a new role',
          type: 'radio',
          required: true,
          options: this.$api.user.roles()
        }
      ];
    }
  },
  methods: {
    open (id) {
      this.id = id;
      this.$api.user.get(id).then((user) => {
        this.user = user;
        this.$refs.dialog.open();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    },
    submit () {
      this.$api.user.changeRole(this.user.id, this.user.role).then(() => {
        this.$store.dispatch('success', 'The role has been changed');
        this.$emit('success');
        this.$refs.dialog.close();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    }
  }
}

</script>
