<template>
  <kirby-dropdown v-if="active" class="kirby-translations">
    <kirby-button icon="globe" alt="Switch Translation" @click="$refs.translations.toggle()">
      {{ $store.state.translation }}
    </kirby-button>
    <kirby-dropdown-content align="right" ref="translations">
      <kirby-dropdown-item v-for="(translation, index) in translations" :key="index" icon="globe" @click="$store.commit('translation', translation)">
        {{ translation }}
      </kirby-dropdown-item>
    </kirby-dropdown-content>
  </kirby-dropdown>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      translations: ["en", "de"]
    };
  }
};
</script>

<style>
.kirby-translations .kirby-button {
  white-space: nowrap;
  text-transform: uppercase;
}
</style>
