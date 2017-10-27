<template>
  <div class="kirby-cards">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-gap: 1.5rem;
}

.kirby-cards .kirby-card {
}

</style>
