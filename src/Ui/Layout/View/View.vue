<template>
  <div class="kirby-view">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-view {
  padding: 2rem 1.5rem;
  max-width: 80rem;
  margin: 0 auto 3rem;
}

@media screen and (min-width: $breakpoint-small) {
  .kirby-view {
    padding: 2rem 3rem;
  }
}

@media screen and (min-width: $breakpoint-medium) {
  .kirby-view {
    padding: 2rem 6rem;
  }
}

</style>
