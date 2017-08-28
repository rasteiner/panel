<template>
  <kirby-dropdown class="kirby-languages">
    <kirby-button icon="globe" alt="Switch Language" @click="$refs.language.toggle()">{{ $store.state.language }}</kirby-button>
    <kirby-dropdown-content align="right" :dark="true" ref="language">
      <kirby-dropdown-item v-for="(language, index) in languages" :key="index" icon="globe" @click="$store.commit('language', language)">{{ language }}</kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>

export default {
  data: function () {
    return {
      languages: ['EN', 'DE']
    }
  }
}

</script>

<style>

.kirby-languages .kirby-button {
  white-space: nowrap;
}

</style>
