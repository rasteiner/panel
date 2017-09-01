<template>
  <div class="kirby-panel" v-if="$store.state.user" :data-menu="$store.state.menu">
    <kirby-menu ref="menu" :open="$store.state.menu" @close="$store.commit('menu', false)">
      <section class="kirby-menu-section">
        <kirby-button @click="$refs.menu.close()" link="/" icon="dashboard">{{ $t("dashboard") }}</kirby-button>
        <kirby-button @click="$refs.menu.close()" link="/pages" icon="page">Site</kirby-button>
        <kirby-button @click="$refs.menu.close()" link="/settings" icon="cog">Settings</kirby-button>
        <kirby-button @click="$refs.menu.close()" link="/users" icon="users">{{ $t("users") }}</kirby-button>
      </section>
      <section class="kirby-menu-section kirby-menu-section-bottom">
        <kirby-button @click="$refs.menu.close()" link="/users/bastian@getkirby.com" icon="account">{{ $t("dashboard.index.account.title") }}</kirby-button>
        <kirby-button @click="logout" link="/logout" icon="logout">{{ $t("logout") }}</kirby-button>
      </section>
    </kirby-menu>
    <router-view class="kirby-panel-view"></router-view>
    <transition name="fade">
      <kirby-notification v-if="$store.state.notification" v-bind="$store.state.notification" />
    </transition>
  </div>
  <div v-else>
    <router-view></router-view>
    <transition name="fade">
      <kirby-notification v-if="$store.state.notification" v-bind="$store.state.notification" />
    </transition>
  </div>
</template>

<script>

export default {
  data () {
    return {
      menu: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}

</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.kirby-panel-view {
  position: relative;
  left: 0;
}

@media screen and (max-width: $breakpoint-menu) {
  .kirby-panel[data-menu] {
    overflow: hidden;
  }
  .kirby-panel[data-menu] .kirby-panel-view {
    position: relative;
    left: calc(100% - 4.5rem);
  }
}

@media screen and (min-width: $breakpoint-menu) {
  .kirby-panel {
    margin-left: $width-menu;
  }
}

</style>
