<template>
  <div class="kirby-widgets">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-widgets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .5rem;
}

</style>
