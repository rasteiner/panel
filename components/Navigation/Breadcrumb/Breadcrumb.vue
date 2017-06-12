<template>
  <ul class="kirby-breadcrumb">
    <slot />
  </ul>
</template>

<style lang="scss">

.kirby-breadcrumb {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 3rem;
  padding: 0 1rem;
  background: $color-white;
}

@media screen and (min-width: 30em) {
  .kirby-breadcrumb {
    padding: 0 .5rem;
  }
}

</style>
