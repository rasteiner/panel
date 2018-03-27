<template>
  <div class="kirby-panel" :data-loading="$store.state.isLoading" :data-menu="$store.state.menu">

    <header class="kirby-topbar" v-if="$store.state.user">
      <kirby-view>
        <div class="kirby-topbar-wrapper">
          <kirby-dropdown class="kirby-topbar-menu">
            <kirby-button class="kirby-topbar-button kirby-topbar-menu-button" @click="$refs.menu.toggle()" icon="bars">
              <kirby-icon type="angle-down" />
            </kirby-button>
            <kirby-dropdown-content ref="menu">
              <kirby-dropdown-item :disabled="!access.site" link="/" icon="page">Site</kirby-dropdown-item>
              <kirby-dropdown-item :disabled="!access.users" link="/users" icon="users">Users</kirby-dropdown-item>

              <kirby-dropdown-item
                v-for="item in pluginMenu"
                :key="item.link"
                :link="button.link"
                :icon="button.icon">
                {{ button.label }}
              </kirby-dropdown-item>

              <kirby-dropdown-item :link="currentUser" icon="account">Your account</kirby-dropdown-item>
              <kirby-dropdown-item link="/logout" icon="logout">Logout</kirby-dropdown-item>
            </kirby-dropdown-content>
          </kirby-dropdown>

          <router-link v-if="view" class="kirby-topbar-button kirby-topbar-view-button" :to="view.link"><kirby-icon :type="view.icon" /> {{ view.label }}</router-link>

          <kirby-dropdown class="kirby-topbar-breadcrumb-menu" v-if="$store.state.breadcrumb.length > 1">
            <kirby-button @click="$refs.crumb.toggle()" class="kirby-topbar-button">
              … <kirby-icon type="angle-down" />
            </kirby-button>

            <kirby-dropdown-content ref="crumb">
              <kirby-dropdown-item :icon="view.icon" :link="view.link">{{ view.label }}</kirby-dropdown-item>
              <kirby-dropdown-item v-for="(crumb, index) in $store.state.breadcrumb" :key="'crumb-' + index + '-dropdown'" :icon="view.icon" :link="crumb.link">{{ crumb.label }}</kirby-dropdown-item>
            </kirby-dropdown-content>
          </kirby-dropdown>

          <nav class="kirby-topbar-crumbs">
            <router-link v-for="(crumb, index) in $store.state.breadcrumb" :key="'crumb-' + index" :to="crumb.link">{{ crumb.label }}</router-link>
          </nav>

          <div class="kirby-topbar-signals">
            <kirby-loader v-if="$store.state.isLoading" class="kirby-panel-loader" />
            <kirby-notification v-else-if="$store.state.notification" v-bind="$store.state.notification" />
            <kirby-form-buttons v-else />
          </div>
        </div>
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
    pluginMenu() {
      return window.panel.plugins.menuItems;
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
  padding-bottom: 3rem;
}

.kirby-panel[data-loading] {
  pointer-events: none;
}

$topbar-back: $color-dark;
$topbar-text: $color-white;

.kirby-topbar {
  position: relative;
  color: $topbar-text;
  flex-shrink: 0;
  height: 2.5rem;
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

.kirby-topbar-wrapper {
  display: flex;
  align-items: center;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}
.kirby-topbar-menu {
  flex-shrink: 0;
}
.kirby-topbar-menu-button {
  display: flex;
}
.kirby-topbar-menu-button .kirby-button-text {
  opacity: 1;
}

.kirby-topbar .kirby-form-button,
.kirby-topbar .kirby-notification,
.kirby-topbar-button {
  padding: 0.75rem;
  font-size: $font-size-small;
}

.kirby-topbar-button .kirby-button-text {
  display: flex;
}

.kirby-topbar-view-button {
  flex-shrink: 0;
  display: flex;
  padding-right: 0;
}
.kirby-topbar-view-button .kirby-icon {
  margin-right: 0.5rem;
}

.kirby-topbar-crumbs {
  flex-grow: 1;
  display: flex;
  overflow: hidden;
}
.kirby-topbar-crumbs a {
  font-size: $font-size-small;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: none;
  opacity: 0.75;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  transition: opacity 0.3s;

  &::before {
    content: "/";
    padding: 0 0.5rem;
    opacity: 0.25;
  }
  &:hover {
    opacity: 1;
  }
}
.kirby-topbar-crumbs a:not(:last-child) {
  max-width: 15vw;
}

.kirby-topbar-breadcrumb-menu {
  flex-shrink: 0;
}

@media screen and (min-width: $breakpoint-small) {
  .kirby-topbar-crumbs a {
    display: block;
  }
  .kirby-topbar-breadcrumb-menu {
    display: none;
  }
}

.kirby-topbar .kirby-button[data-state="positive"] {
  color: $color-positive-on-dark;
}
.kirby-topbar .kirby-button[data-state="negative"] {
  color: $color-negative-on-dark;
}

.kirby-topbar .kirby-button[data-state="negative"] .kirby-button-text {
  display: none;

  @media screen and (min-width: $breakpoint-small) {
    display: inline;
  }
}

.kirby-topbar .kirby-button[data-state] .kirby-button-text {
  opacity: 1;
}

.kirby-topbar .kirby-dropdown-content {
  color: $color-dark;
  background: $color-white;
}
</style>
