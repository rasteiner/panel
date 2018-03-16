<template>
  <kirby-dialog ref="dialog" size="medium" state="positive" button="Rename" @submit="$refs.form.submit()">
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
        id: null,
        name: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "name",
          label: "Name",
          type: "text",
          icon: "user"
        }
      ];
    }
  },
  methods: {
    open(id) {
      this.$api.user.get(id, { select: ["id", "name"] }).then(user => {
        this.user = user;
        this.$refs.dialog.open();
      });
    },
    submit() {
      this.$api.user.changeName(this.user.id, this.user.name).then(user => {
        this.success({
          message: "The username has been changed",
          event: "user.changeName"
        });
      });
    }
  }
};
</script>
