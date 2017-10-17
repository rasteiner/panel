<template>
  <div v-if="!loading" class="kirby-installation-view">
    <form @submit.prevent="install">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("install") }}</kirby-button>
    </form>
  </div>
  <kirby-loader v-else position="center" theme="dark" />
</template>

<script>

import User from 'App/Api/User.js';

export default {
  data () {
    return {
      loading: false,
      user: {
        language: 'en'
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

      User.create(this.user).then((user) => {
        this.loading = false;
        this.$store.dispatch('login');
        this.$store.dispatch('success', this.$t('notification.welcome', { name: this.$store.state.user.firstName }));
        this.$router.push('/');
      });

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
