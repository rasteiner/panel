<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Rename" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="page" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      page: {
        id: null,
        title: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          icon: "title"
        }
      ];
    }
  },
  methods: {
    open(id) {
      this.$api.page.get(id, { select: ["id", "title"] }).then(page => {
        this.page = page;
        this.$refs.dialog.open();
      });
    },
    submit() {
      this.$api.page.title(this.page.id, this.page.title).then(page => {
        this.success({
          message: "The page has been renamed",
          event: "page.changeTitle"
        });
      });
    }
  }
};
</script>
