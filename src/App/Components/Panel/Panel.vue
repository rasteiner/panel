<template>
  <div class="kirby-panel" :data-loading="$store.state.isLoading" :data-menu="$store.state.menu">

    <header class="kirby-topbar">
      <kirby-view>
        <kirby-bar>
          <template slot="left">
            <nav class="kirby-topbar-crumb">
              <kirby-dropdown>
                <kirby-button class="kirby-topbar-button" @click="$refs.menu.toggle()" icon="bars">
                  <kirby-icon type="angle-down" />
                </kirby-button>
                <kirby-dropdown-content ref="menu">
                  <kirby-dropdown-item link="/" icon="page">Site</kirby-dropdown-item>
                  <kirby-dropdown-item link="/users" icon="users">Users</kirby-dropdown-item>
                  <kirby-dropdown-item :link="currentUser" icon="account">Your account</kirby-dropdown-item>
                  <kirby-dropdown-item link="/logout" icon="logout">Logout</kirby-dropdown-item>
                </kirby-dropdown-content>
              </kirby-dropdown>
              <kirby-button v-if="view" class="kirby-topbar-button" :link="view.link" :icon="view.icon">
                {{ view.label }}
              </kirby-button>
              <kirby-button v-for="crumb in $store.state.breadcrumb" class="kirby-topbar-button" :link="crumb.link">
                {{ crumb.label }}
              </kirby-button>
            </nav>
          </template>

          <template slot="right">
            <kirby-loader v-if="$store.state.isLoading" class="kirby-panel-loader" />
            <kirby-notification v-else-if="$store.state.notification" v-bind="$store.state.notification" />
            <kirby-form-buttons v-else />
          </template>

        </kirby-bar>
      </kirby-view>
    </header>

    <div class="kirby-panel-view">
      <router-view />
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  computed: {
    view() {
      return this.$store.state.view;
    },
    currentUser() {
      return "/users/" + this.$store.state.user.id;
    },
    pluginButtons() {
      return window.panel.plugins.menuButtons;
    },
    access() {
      return this.$store.state.user.permissions.access;
    }
  },
  methods: {
    preview() {
      window.open(window.panel.config.index);
    },
    logout() {
      this.$store.dispatch("user", null);
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

html {
  overflow: hidden;
  height: 100%;
}

.kirby-panel {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.kirby-panel-view {
  position: relative;
  left: 0;
  flex-grow: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.kirby-panel[data-loading] {
  pointer-events: none;
}

$topbar-back: $color-white;
$topbar-text: $color-dark;

.kirby-topbar {
  position: relative;
  height: 2.65rem;
  color: $topbar-text;
  flex-shrink: 0;
  background: $topbar-back;
}
.kirby-topbar::after {
  position: absolute;
  content: "";
  bottom: -5px;
  left: 0;
  right: 0;
  height: 5px;
  z-index: 1;
  background: -webkit-linear-gradient(
    top,
    rgba($color-dark, 0.025),
    rgba($color-dark, 0)
  );
}

.kirby-topbar .kirby-button-group .kirby-button {
  padding-top: 0.8rem !important;
}

.kirby-topbar .kirby-bar {
  margin-left: -0.75rem;
}
.kirby-topbar-button {
  padding: 0.75rem;
}
.kirby-topbar-button-label {
  display: none;

  @media screen and (min-width: $breakpoint-medium) {
    display: inline;
  }
}

.kirby-topbar .kirby-bar-slot[data-position="left"] {
  display: flex;
  align-items: center;
}
.kirby-topbar-crumb .kirby-topbar-button {
  position: relative;
  height: 100%;

  &::after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -0.25rem;
    content: "/";
    opacity: 0.25;
  }
  &:last-of-type::after {
    display: none;
  }

  &:nth-child(2) .kirby-button-text {
    opacity: 1;
    font-weight: 500;
  }
}

.kirby-topbar-dropdown-icon {
  opacity: 1;
}

.kirby-topbar .kirby-dropdown-content {
  margin: 0.825rem 0;
}
</style>
