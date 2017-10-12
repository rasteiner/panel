<template>
  <kirby-dialog ref="dialog" headline="Delete file" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ filename }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>

import DialogMixin from 'Ui/Dialog/Dialog.mixin.js';
import File from 'App/Api/File.js';

export default {
  mixins: [DialogMixin],
  data() {
    return {
      parent: null,
      filename: null
    };
  },
  methods: {
    open (parent, filename) {
      File.get(parent, filename).then((file) => {
        this.parent   = file.parent;
        this.filename = file.filename;
        this.$refs.dialog.open();
      });
    },
    submit () {
      File.delete(this.parent, this.filename).then(() => {
        this.$store.dispatch('success', 'The file has been deleted');
        this.$emit('success');
      });
    }
  }
}

</script>
