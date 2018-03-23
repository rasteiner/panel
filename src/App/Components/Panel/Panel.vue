<template>
  <div class="kirby-panel" :data-loading="$store.state.isLoading" :data-menu="$store.state.menu">

    <kirby-menu ref="menu" v-if="$store.state.user" :open="$store.state.menu" @close="$store.commit('menu', false)">
      <section class="kirby-menu-section">
        <kirby-button v-if="access.site" @click="$refs.menu.close()" link="/pages" icon="page">
          {{ $t('site') }}
        </kirby-button>
        <kirby-button v-if="access.users" @click="$refs.menu.close()" link="/users" icon="users">
          {{ $t('users') }}
        </kirby-button>
      </section>

      <section class="kirby-menu-section kirby-menu-section-plugins">
        <kirby-button
          v-for="button in pluginButtons"
          :key="button.link"
          @click="$refs.menu.close()"
          :link="button.link"
          :icon="button.icon"> {{ button.label }} </kirby-button>
      </section>

      <section class="kirby-menu-section kirby-menu-section-bottom">
        <kirby-button @click="preview" icon="open">
          Open site
        </kirby-button>
        <kirby-button v-if="access.users" @click="$refs.menu.close()" :link="currentUser" icon="account">
          {{ $t('account') }}
        </kirby-button>
        <kirby-button @click="logout" icon="logout">
          {{ $t('logout') }}
        </kirby-button>
      </section>
    </kirby-menu>

    <div class="kirby-panel-view">
      <router-view />
    </div>

    <transition name="fade">
      <kirby-notification v-if="$store.state.notification" v-bind="$store.state.notification" />
    </transition>

    <transition name="fade">
      <kirby-loader v-if="$store.state.isLoading" class="kirby-panel-loader" />
    </transition>

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

.kirby-panel-view {
  position: relative;
  left: 0;
}

.kirby-panel[data-loading] {
  pointer-events: none;
}

.kirby-panel-loader {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
}

@media screen and (max-width: $breakpoint-menu) {
  .kirby-panel[data-menu] {
    overflow: hidden;
  }
  .kirby-panel[data-menu] .kirby-panel-view {
    position: relative;

    [dir="ltr"] & {
      left: calc(100% - 4.5rem);
    }
    [dir="rtl"] & {
      right: calc(100% - 4.5rem);
    }
  }
}

@media screen and (min-width: $breakpoint-menu) {
  .kirby-panel {
    [dir="ltr"] & {
      margin-left: $width-menu;
    }
    [dir="rtl"] & {
      margin-right: $width-menu;
    }
  }
}
</style>
