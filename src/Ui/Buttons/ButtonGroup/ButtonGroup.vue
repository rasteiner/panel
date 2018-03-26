<template>
  <div class="kirby-button-group">
    <slot />
  </div>
</template>


<style lang="scss">
.kirby-button-group {
  font-size: 0;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}
.kirby-button-group > .kirby-dropdown > .kirby-button,
.kirby-button-group > .kirby-button {
  padding: 1rem 0.75rem;
}
.kirby-button-group .kirby-dropdown-content {
  top: calc(100% + 1rem);
  margin: 0 1rem;
}
</style>
