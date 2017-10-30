<template>
  <div v-if="!$store.state.isLoading" class="kirby-installation-view">
    <form v-if="ok" @submit.prevent="install">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("install") }}</kirby-button>
    </form>
    <div v-else>
      <kirby-headline :margin="true">The panel cannot be installed</kirby-headline>

      <ul class="kirby-installation-issues">
        <li v-if="status.php === false">
          <kirby-icon type="cancel" />
          Make sure to use <code>PHP 7+</code>
        </li>

        <li v-if="status.server === false">
          <kirby-icon type="cancel" />
          Kirby requires <code>Apache</code> or <code>Nginx</code>
        </li>

        <li v-if="status.mbstring === false">
          <kirby-icon type="cancel" />
          The <code>MB String</code> extension is required
        </li>

        <li v-if="status.curl === false">
          <kirby-icon type="cancel" />
          The <code>CURL</code> extension is required
        </li>

        <li v-if="status.accounts === false">
          <kirby-icon type="cancel" />
          The <code>/site/accounts</code> folder does not exist or is not writable
        </li>

        <li v-if="status.content === false">
          <kirby-icon type="cancel" />
          The <code>/content</code> folder does not exist or is not writable
        </li>

        <li v-if="status.media === false">
          <kirby-icon type="cancel" />
          The <code>/media</code> folder does not exist or is not writable
        </li>

      </ul>

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
      ok: true,
      status: {
        php: false,
        server: false,
        mbstring: false,
        curl: false,
        accounts: false,
        content: false,
        media: false
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

        this.$store.dispatch('isLoading', false);

      });
    },
    install () {

      this.$store.dispatch('isLoading', true);

      this.$api.user.create(this.user).then((user) => {
        this.$api.auth.login(this.user).then((user) => {
          this.$store.dispatch('user', user);
          this.$store.dispatch('success', 'Welcome!');
          this.$router.push('/');
        });
      }).catch((error) => {
        this.$store.dispatch('error', error.message);
        this.$store.dispatch('isLoading', false);
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
.kirby-installation-issues li {
  position: relative;
  padding-left: 2rem;
}
.kirby-installation-issues .kirby-icon {
  position: absolute;
  top: 2px;
  left: 0;
}
.kirby-installation-issues .kirby-icon svg * {
  fill: $color-negative;
}
.kirby-installation-issues li:not(:last-child) {
  margin-bottom: 1.5rem;
}
.kirby-installation-issues li code {
  font: inherit;
  color: $color-negative;
}

</style>
