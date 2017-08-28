<template>
  <kirby-dialog ref="dialog" headline="Delete file" state="negative" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ file.filename }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
// import FileQuery from 'App/Api/FileQuery.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      file: {
        filename: null
      }
    };
  },
  methods: {
    open (filename) {
      this.file.filename = filename;
      this.$refs.dialog.open();
    },
    submit () {
      this.$store.dispatch('success', 'The file has been deleted');
    }
  }
}

</script>
