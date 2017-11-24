<template>
  <kirby-dialog ref="dialog" state="positive" icon="check" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="values" @submit="submit" />
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'App/Dialogs/Dialogs.mixin.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: null,
      values: {
        language: 'en'
      },
      fields: [
        {
          name: 'language',
          label: 'Language',
          type: 'language',
          required: true
        }
      ]
    }
  },
  methods: {
    open (id) {
      this.$api.user.get(id).then((user) => {
        this.user = user;
        this.$refs.dialog.open();
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
      });
    },
    submit () {

    }
  }
}

</script>
