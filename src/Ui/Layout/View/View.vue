<template>
  <div class="kirby-view">
    <slot />
  </div>
</template>

<style lang="scss">
.kirby-view {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin: 0 auto;
  max-width: 120rem;

  @media screen and (min-width: $breakpoint-small) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media screen and (min-width: $breakpoint-medium) {
    padding-left: 6rem;
    padding-right: 6rem;
  }

  @media screen and (min-width: $breakpoint-large) {
    padding-left: 9rem;
    padding-right: 9rem;
  }

  @media screen and (min-width: $breakpoint-huge) {
    padding-left: 12rem;
    padding-right: 12rem;
  }
}
</style>
