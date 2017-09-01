<template>
  <div v-if="!loading" class="kirby-login-view">
    <form @submit.prevent="login">
      <kirby-fieldset :fields="fields" />
      <kirby-button type="submit" icon="check">{{ $t("login") }}</kirby-button>
    </form>
  </div>
  <kirby-loader v-else position="center" theme="dark" />
</template>

<script>

export default {
  data () {
    return {
      loading: false
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
          type: 'text',
          icon: 'key',
          placeholder: this.$t('password') + ' …'
        }
      ]
    }
  },
  methods: {
    login () {

      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch('login');
        this.$store.dispatch('success', this.$t('notification.welcome', { name: this.$store.state.user.firstName }));
        this.$router.push('/');
      }, 2000);
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
.kirby-login-view .kirby-field-header {
  display: none;
}
.kirby-login-view .kirby-button {
  display: block;
  margin-top: 1.5rem;
}

</style>
