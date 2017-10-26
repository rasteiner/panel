<template>
  <div v-if="!loading" class="kirby-installation-view">
    <form v-if="ok" @submit.prevent="install">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("install") }}</kirby-button>
    </form>
    <div v-else>
      <kirby-headline :margin="true">The panel cannot be installed</kirby-headline>

      <dl class="kirby-installation-issues">
        <template v-if="status.php === false">
          <dt>PHP Version</dt>
          <dd>Make sure to use PHP 7+</dd>
        </template>

        <template v-if="status.server === false">
          <dt>Server</dt>
          <dd>Kirby requires Apache or Nginx</dd>
        </template>

        <template v-if="status.mbstring === false">
          <dt>MB String</dt>
          <dd>The MB String extension is required</dd>
        </template>

        <template v-if="status.curl === false">
          <dt>CURL</dt>
          <dd>The CURL extension is required</dd>
        </template>

        <template v-if="status.accounts === false">
          <dt>Accounts</dt>
          <dd>The /site/accounts folder must be writable</dd>
        </template>

        <template v-if="status.content === false">
          <dt>Content</dt>
          <dd>The /content folder must be writable</dd>
        </template>

        <template v-if="status.files === false">
          <dt>Thumbs</dt>
          <dd>The /thumbs folder must be writable</dd>
        </template>
      </dl>

      <kirby-button icon="refresh" @click="check">Try again</kirby-button>

    </div>
  </div>
  <kirby-loader v-else position="center" theme="dark" />
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      ok: false,
      status: {
        php: false,
        server: false,
        mbstring: false,
        curl: false,
        accounts: false,
        content: false,
        files: false
      },
      user: {
        language: 'en',
        role: 'admin'
      }
    };
  },
  created () {
    this.check();
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
    check () {
      this.$api.panel.system().then((system) => {

        if (system.isInstalled === true) {
          this.$router.push('/');
        }

        this.ok     = system.isOk;
        this.status = system.details;

      });
    },
    install () {

      this.loading = true;

      this.$api.user.create(this.user).then((user) => {
        this.$api.auth.login(this.user).then((user) => {
          this.$store.dispatch('user', user);
          this.$store.dispatch('success', this.$t('notification.welcome', { name: this.$store.state.user.name }));
          this.$router.push('/');
        });
      }).catch((error) => {
        this.loading = false;
        this.$store.dispatch('error', error.message);
      });

    }
  }
}

</script>

<style lang="scss">

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

.kirby-installation-issues {
  line-height: 1.5em;
  font-size: $font-size-small;
  font-family: $font-family-mono;
  background: $color-white;
  border-radius: $border-radius;
  padding: 1.5rem;
}
.kirby-installation-issues dt {
  color: $color-negative;
}
.kirby-installation-issues dd:not(:last-child) {
  margin-bottom: 1.5rem;
}

</style>
