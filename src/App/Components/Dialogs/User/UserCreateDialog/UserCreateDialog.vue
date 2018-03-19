<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Create" @submit="$refs.form.submit()">
    <kirby-form ref="form" :fields="fields" :values="user" @submit="create" />
  </kirby-dialog>
</template>

<script>
import DialogMixin from "App/Components/Dialogs/Dialogs.mixin.js";

export default {
  mixins: [DialogMixin],
  data() {
    return {
      user: {
        email: "",
        password: "",
        language: "en_US",
        // TODO: change to config default user role
        role: "admin"
      },
      roles: []
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "email",
          label: "Email",
          type: "email",
          icon: "email",
          id: "new-user-email",
          required: true
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          icon: "key",
          id: "new-user-password",
          required: true
        },
        {
          name: "role",
          label: "Role",
          type: "radio",
          required: true,
          options: this.roles
        }
      ];
    }
  },
  methods: {
    open() {
      this.$api.role.options().then(roles => {
        this.roles = roles;
        this.$refs.dialog.open();
      });
    },
    create() {
      this.$api.user.create(this.user).then(user => {
        this.user = {
          email: "",
          password: "",
          language: "en_US",
          // TODO: change to config default user role
          role: "admin"
        };

        this.success({
          message: "The user has been created",
          event: "user.create"
        });
      });
    }
  }
};
</script>
