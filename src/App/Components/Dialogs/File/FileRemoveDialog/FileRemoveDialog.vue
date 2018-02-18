<template>
  <kirby-dialog ref="dialog" headline="Delete file" state="negative" icon="trash" button="Delete" @submit="submit">
    <kirby-txt>
      Do you really want to delete <br><strong>{{ filename }}</strong>?
    </kirby-txt>
  </kirby-dialog>
</template>

<script>
import DialogMixin from "Ui/Dialog/Dialog.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      parent: null,
      filename: null
    };
  },
  methods: {
    open(parent, filename) {
      this.$api.file
        .get(parent, filename)
        .then(file => {
          this.parent = file.parent;
          this.filename = file.filename;
          this.$refs.dialog.open();
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    },
    submit() {
      this.$api.file
        .delete(this.parent.id, this.filename)
        .then(() => {
          this.$store.dispatch("success", "The file has been deleted");
          this.$events.$emit("file.delete");
          this.$emit("success");
          this.$refs.dialog.close();
        })
        .catch(error => {
          this.$store.dispatch("error", error.message);
        });
    }
  }
};
</script>
