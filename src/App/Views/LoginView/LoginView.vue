<template>
  <div v-if="$store.state.isLoading === false" class="kirby-login-view">
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
      loading: false,
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
  created() {
    this.$store.dispatch("isLoading", false);
  },
  watch: {
    $route() {
      this.$store.dispatch("isLoading", false);
    }
  },
  methods: {
    login() {
      this.$store.dispatch("title", "Login");
      this.$store.dispatch("isLoading", true);

      this.$api.auth
        .login(this.user)
        .then(user => {
          this.$store.dispatch("user", user);
          this.$store.dispatch("success", "Welcome!");

          if (this.$store.state.afterLogin) {
            this.$router.push(this.$store.state.afterLogin);
            this.$store.commit("afterLogin", null);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          this.$store.dispatch("isLoading", false);
          this.$store.dispatch("error", "Invalid email or password");
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
