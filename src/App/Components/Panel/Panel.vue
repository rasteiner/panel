<template>
  <div class="kirby-panel" :data-loading="$store.state.isLoading" :data-menu="$store.state.menu">

    <kirby-menu ref="menu" v-if="$store.state.user" :open="$store.state.menu" @close="$store.commit('menu', false)">
      <section class="kirby-menu-section">
        <kirby-button @click="$store.dispatch('error', 'Not yet implemented')" icon="dashboard">
          {{ $t('dashboard') }}
        </kirby-button>
        <kirby-button @click="$refs.menu.close()" link="/pages" icon="page">
          {{ $t('site') }}
        </kirby-button>
        <kirby-button @click="$store.dispatch('error', 'Not yet implemented')" icon="cog">
          {{ $t('settings') }}
        </kirby-button>
        <kirby-button @click="$refs.menu.close()" link="/users" icon="users">
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
        <kirby-button @click="preview" icon="preview">
          Open site
        </kirby-button>
        <kirby-button @click="$refs.menu.close()" :link="currentUser" icon="account">
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

.kirby-panel[data-loading] .kirby-panel-view {
  opacity: 0.25;
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
