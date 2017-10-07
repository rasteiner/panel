<template>
  <div v-if="!loading" class="kirby-installation-view">
    <form @submit.prevent="install">
      <kirby-fieldset :fields="fields" />
      <kirby-button type="submit" icon="check">{{ $t("install") }}</kirby-button>
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
          type: 'password',
          placeholder: this.$t('password') + ' …'
        },
        {
          name: 'language',
          label: this.$t('user.language'),
          type: 'language'
        }
      ]
    }
  },
  methods: {
    install () {

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

.kirby-installation-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
}
.kirby-installation-view .kirby-button {
  display: block;
  margin-top: 1.5rem;
}

</style>
