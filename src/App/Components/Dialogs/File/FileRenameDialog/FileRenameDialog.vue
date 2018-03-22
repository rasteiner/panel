<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Rename" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="file" @submit="submit" @input="file.name = sluggify(file.name)" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";
import slug from "App/Helpers/slug.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      parent: null,
      file: {
        id: null,
        name: null,
        filename: null,
        extension: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "name",
          label: "Filename",
          type: "text",
          required: true,
          icon: "title",
          postfix: "." + this.file.extension
        }
      ];
    }
  },
  methods: {
    open(parent, filename) {
      this.parent = parent;
      this.$api.file
        .get(parent, filename, {
          select: ["id", "filename", "name", "extension"]
        })
        .then(file => {
          this.file = file;
          this.$refs.dialog.open();
        });
    },
    sluggify(input) {
      return slug(input);
    },
    submit() {
      this.$api.file
        .rename(this.parent, this.file.filename, this.file.name)
        .then(file => {
          let payload = {
            message: "The file has been renamed",
            event: "file.changeName"
          };

          if (this.$route.name === "File") {
            payload.route = this.$api.file.link(this.parent, file.filename);
          }

          this.success(payload);
        });
    }
  }
};
</script>
