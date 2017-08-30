<template>
  <div class="kirby-widgets">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-widgets {
  display: grid;
  grid-gap: .5rem;

  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: $breakpoint-small) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: $breakpoint-medium) {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>
