<template>
  <div class="kirby-installation-view">
    <form v-if="info.isOk" @submit.prevent="install">
      <kirby-fieldset :fields="fields" :values="user" />
      <kirby-button type="submit" icon="check">{{ $t("install") }}</kirby-button>
    </form>
    <div v-else>
      <kirby-headline>The panel cannot be installed</kirby-headline>

      <ul class="kirby-installation-issues">
        <li v-if="info.details.php === false">
          <kirby-icon type="cancel" />
          Make sure to use <code>PHP 7+</code>
        </li>

        <li v-if="info.details.server === false">
          <kirby-icon type="cancel" />
          Kirby requires <code>Apache</code> or <code>Nginx</code>
        </li>

        <li v-if="info.details.mbstring === false">
          <kirby-icon type="cancel" />
          The <code>MB String</code> extension is required
        </li>

        <li v-if="info.details.curl === false">
          <kirby-icon type="cancel" />
          The <code>CURL</code> extension is required
        </li>

        <li v-if="info.details.accounts === false">
          <kirby-icon type="cancel" />
          The <code>/site/accounts</code> folder does not exist or is not writable
        </li>

        <li v-if="info.details.content === false">
          <kirby-icon type="cancel" />
          The <code>/content</code> folder does not exist or is not writable
        </li>

        <li v-if="info.details.media === false">
          <kirby-icon type="cancel" />
          The <code>/media</code> folder does not exist or is not writable
        </li>

      </ul>

      <kirby-button icon="refresh" @click="check">Try again</kirby-button>

    </div>
  </div>
</template>

<script>
import System from "Api/System.js";

export default {
  data() {
    return {
      info: {
        isOk: false,
        isInstalled: false,
        details: {}
      },
      user: {
        email: null,
        password: null,
        language: "en_US",
        role: "admin"
      }
    };
  },
  created() {
    this.$store.dispatch("title", "Installation");
  },
  beforeRouteEnter(to, from, next) {
    System.info().then(info => {
      if (info.isInstalled === true) {
        next("/login");
      } else {
        next(vm => {
          vm.setInfo(info);
        });
      }
    });
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
          type: "password",
          placeholder: this.$t("password") + " …"
        },
        {
          name: "language",
          label: this.$t("user.language"),
          type: "language"
        }
      ];
    }
  },
  methods: {
    install() {
      this.$api.system.install(this.user).then(user => {
        this.$api.auth.login(this.user).then(user => {
          this.$store.dispatch("user", user);
          this.$store.dispatch("success", "Welcome!");
          this.$router.push("/");
        });
      });
    },
    check() {
      this.$api.system.info().then(info => {
        if (info.isInstalled === true) {
          this.$router.push("/login");
        } else {
          this.info = info;
        }
      });
    },
    setInfo(info) {
      this.info = info;
    }
  }
};
</script>

<style lang="scss">
.kirby-installation-view {
  position: fixed;
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
