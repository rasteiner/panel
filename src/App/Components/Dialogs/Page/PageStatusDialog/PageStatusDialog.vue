<template>
  <kirby-dialog ref="dialog" :size="settings.size" :state="settings.state" :button="settings.button" @submit="submit">
    <kirby-txt v-if="hasErrors">This page has errors and cannot be published</kirby-txt>
    <kirby-form v-else ref="form" :fields="fields" :values="$data" @submit="changeStatus" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      page: {
        id: null
      },
      status: null,
      position: null
    };
  },
  computed: {
    settings() {
      if (this.hasErrors) {
        return {
          size: "small",
          state: null,
          button: "Ok"
        };
      }

      return {
        size: "medium",
        state: "positive",
        button: "Change"
      };
    },
    hasErrors() {
      return this.page.isVisible === false && this.page.errors.length > 0;
    },
    fields() {
      let fields = [
        {
          name: "status",
          label: "Select a new status",
          type: "radio",
          required: true,
          options: [
            {
              value: "invisible",
              text: "Private",
              info: "The page is only accessible via URL"
            },
            {
              value: "visible",
              text: "Public",
              info: "The page is public for anyone"
            }
          ]
        }
      ];

      if (this.status === "visible") {
        fields.push({
          name: "position",
          label: "Please select a position",
          type: "number",
          help: "This is definitely going to change :)"
        });
      }

      return fields;
    }
  },
  methods: {
    open(id) {
      this.$api.page
        .get(id, { select: ["id", "isVisible", "num", "errors"] })
        .then(page => {
          this.page = page;
          this.status = page.isVisible ? "visible" : "invisible";
          this.position = page.num;
          this.$refs.dialog.open();
        });
    },
    submit() {
      if (this.hasErrors === true) {
        return this.$refs.dialog.close();
      }

      this.$refs.form.submit();
    },
    changeStatus() {
      if (this.status === "draft") {
        this.$store.dispatch("error", "Drafts are not yet implemented");
        return;
      }

      this.$api.page
        .status(this.page.id, this.status, this.position)
        .then(() => {
          let message = "The page is now " + this.status;

          if (this.status === "visible") {
            message = "The page is now at position " + this.position;
          }

          this.success({
            message: message,
            event: "page.change.status"
          });
        });
    }
  }
};
</script>
