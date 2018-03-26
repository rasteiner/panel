<template>
  <header class="kirby-header">
    <kirby-headline size="large" @dblclick.native="$emit('edit')">
      <slot />
    </kirby-headline>
    <kirby-bar>
      <kirby-button-group class="kirby-header-options-primary" slot="left">
        <slot name="buttons-left" />
      </kirby-button-group>
      <slot slot="right" class="kirby-header-options-secondary" name="buttons-right" />
    </kirby-bar>
  </header>
</template>

<style lang="scss">
.kirby-header {
  border-bottom: 1px solid $color-border;
  margin-bottom: 1.5rem;
  padding-top: 4vh;
}
.kirby-header .kirby-headline {
  max-width: 35rem;
}
</style>
