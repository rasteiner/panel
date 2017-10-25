<template>
  <div v-if="!loading" class="kirby-login-view">
    <form @submit.prevent="login">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("login") }}</kirby-button>
    </form>
  </div>
  <kirby-loader v-else position="center" theme="dark" />
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      user: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    fields () {
      return [
        {
          name: 'email',
          label: this.$t('email'),
          type: 'email',
          placeholder: this.$t('email.placeholder')
        },
        {
          name: 'password',
          label: this.$t('password'),
          type: 'password',
        }
      ]
    }
  },
  methods: {
    login () {

      this.loading = true;

      this.$api.auth.login(this.user).then((user) => {
        this.loading = false;
        this.$store.dispatch('user', user);
        this.$store.dispatch('success', this.$t('notification.welcome', { name: user.content.firstname }));
        this.$router.push('/');
      }).catch((error) => {
        this.loading = false;
        this.$store.dispatch('error', 'Invalid email or password');
      });

    }
  }
}

</script>

<style>

.kirby-login-view {
  position: absolute;
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
