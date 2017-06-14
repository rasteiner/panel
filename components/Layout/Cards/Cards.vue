<template>
  <div class="kirby-cards">
    <slot />
  </div>
</template>

<style lang="scss">

.kirby-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 3fr));  
  grid-gap: 1.5rem;
}

</style>
