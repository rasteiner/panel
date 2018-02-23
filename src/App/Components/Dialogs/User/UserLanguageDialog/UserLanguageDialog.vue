<template>
  <kirby-dialog ref="dialog" state="positive" icon="check" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: {
        language: "en_US"
      },
      fields: [
        {
          name: "language",
          label: "Language",
          type: "language",
          icon: "globe",
          required: true
        }
      ]
    };
  },
  methods: {
    open(id) {
      this.$api.user.get(id).then(user => {
        this.user = user;
        this.$refs.dialog.open();
      });
    },
    submit() {
      this.$api.user
        .changeLanguage(this.user.id, this.user.language)
        .then(user => {
          this.user = user;

          // if current panel user, switch language
          if (this.$store.state.user.id === this.user.id) {
            this.$store.dispatch("locale", this.user.language);
          }

          this.success({
            message: "The language has been changed",
            event: "user.change.language"
          });
        });
    }
  }
};
</script>
