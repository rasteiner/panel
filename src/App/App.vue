<template>
  <div class="kirby-app">
    <router-view></router-view>
    <transition name="fade">
      <kirby-notification v-if="$store.state.notification" v-bind="$store.state.notification" />
    </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
