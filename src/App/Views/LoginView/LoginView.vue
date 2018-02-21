<template>
  <div v-if="form" class="kirby-login-view">
    <form @submit.prevent="login">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("login") }}</kirby-button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: true,
      user: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "email",
          label: this.$t("email"),
          type: "email",
          placeholder: this.$t("email.placeholder")
        },
        {
          name: "password",
          label: this.$t("password"),
          type: "password"
        }
      ];
    }
  },
  methods: {
    login() {
      this.$store.dispatch("title", "Login");

      this.$api.auth
        .login(this.user)
        .then(user => {
          this.form = false;

          this.$store.dispatch("user", user);
          this.$store.dispatch("success", "Welcome!");

          if (this.$store.state.afterLogin) {
            this.$router.push(this.$store.state.afterLogin);
            this.$store.commit("afterLogin", null);
          } else {
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.form = true;
        });
    }
  }
};
</script>

<style>
.kirby-login-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
}
.kirby-login-view .kirby-button {
  display: block;
  margin-top: 1.5rem;
}
</style>
