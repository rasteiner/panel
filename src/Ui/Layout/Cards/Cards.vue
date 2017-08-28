<template>
  <div class="kirby-cards">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1.5rem;
}

.kirby-cards .kirby-card {
  // card can get larger than grid column if it has a long title or info text
  width: 100%;
}

</style>
