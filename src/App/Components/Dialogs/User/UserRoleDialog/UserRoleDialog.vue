<template>
  <kirby-dialog ref="dialog" size="medium" headline="Change the user's role" state="positive" button="Change role" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="submit" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      roles: [],
      user: {
        id: null,
        role: "visitor"
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "role",
          label: "Select a new role",
          type: "radio",
          required: true,
          options: this.roles
        }
      ];
    }
  },
  methods: {
    open(id) {
      this.id = id;

      this.$api.user.get(id).then(user => {
        this.$api.role.options().then(roles => {
          this.roles = roles;
          this.user = user;
          this.$refs.dialog.open();
        });
      });
    },
    submit() {
      this.$api.user.changeRole(this.user.id, this.user.role).then(() => {
        this.success({
          message: "The has been changed to: " + this.user.role,
          event: "user.changeRole"
        });
      });
    }
  }
};
</script>
