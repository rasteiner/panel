<template>
  <kirby-dialog ref="dialog" :size="settings.size" :state="settings.state" :button="settings.button" @submit="submit">
    <kirby-txt v-if="isBlocked">The status for this page cannot be changed</kirby-txt>
    <kirby-txt v-else-if="isIncomplete">This page has errors and cannot be published</kirby-txt>
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
      isBlocked: false,
      isIncomplete: false,
      status: null,
      position: null
    };
  },
  computed: {
    settings() {
      if (this.isIncomplete || this.isBlocked) {
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
    fields() {
      const states = this.$api.page.states();

      let fields = [
        {
          name: "status",
          label: "Select a new status",
          type: "radio",
          required: true,
          options: Object.keys(states).map(key => {
            return {
              value: key,
              text: states[key].label,
              info: states[key].description
            };
          })
        }
      ];

      if (this.status === "listed" && this.page.blueprint.num === "default") {
        fields.push({
          name: "position",
          label: "Please select a position",
          type: "select",
          options: this.sortingOptions()
        });
      }

      return fields;
    }
  },
  methods: {
    sortingOptions() {
      let options = [];
      let index = 0;

      this.page.siblings.forEach(sibling => {
        if (sibling.id === this.page.id || sibling.num < 1) {
          return false;
        }

        index++;

        options.push({
          value: index,
          text: index
        });

        options.push({
          value: sibling.id,
          text: sibling.title,
          disabled: true
        });
      });

      options.push({
        value: index + 1,
        text: index + 1
      });

      return options;
    },
    open(id) {
      this.$api.page
        .get(id, {
          select: ["id", "status", "num", "errors", "siblings", "blueprint"]
        })
        .then(page => {
          this.page = page;
          this.status = page.status;
          this.isBlocked = page.blueprint.options.changeStatus === false;
          this.isIncomplete =
            page.isVisible === false && this.page.errors.length > 0;
          this.position = page.num;
          this.$refs.dialog.open();
        });
    },
    submit() {
      if (this.isIncomplete === true || this.isBlocked === true) {
        return this.$refs.dialog.close();
      }

      this.$refs.form.submit();
    },
    changeStatus() {
      this.$api.page
        .status(this.page.id, this.status, this.position || 1)
        .then(response => {
          let message = "";

          if (this.status === "listed") {
            if (this.page.blueprint.num === "default") {
              message = "The page is now at position " + response.num;
            } else {
              message = "The page is now public";
            }
          } else {
            message = "The page is now unlisted";
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
