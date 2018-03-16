<template>
  <kirby-dialog ref="dialog" state="positive" icon="check" button="Change" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="values" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: null,
      values: {
        password: null,
        passwordConfirmation: null
      },
      fields: [
        {
          name: "password",
          label: "New password",
          type: "password",
          icon: "key",
          required: true
        },
        {
          name: "passwordConfirmation",
          label: "Confirm the new password …",
          icon: "key",
          type: "password",
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
      if (this.values.password.length === 0) {
        this.$store.dispatch("error", "Please enter a valid password");
        return false;
      }

      if (this.values.password !== this.values.passwordConfirmation) {
        this.$store.dispatch("error", "The passwords must match");
        return false;
      }

      this.$api.user
        .changePassword(this.user.id, this.values.password)
        .then(() => {
          this.success({
            message: "The password has been changed",
            event: "user.changePassword"
          });
        });
    }
  }
};
</script>
