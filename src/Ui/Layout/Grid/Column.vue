<template>
  <div class="kirby-column" :data-width="width">
    <div class="kirby-column-content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: ['width']
}

</script>

<style lang="scss">

@media screen and (min-width: $breakpoint-medium) {

  .kirby-column[data-width="1/1"] {
    grid-column-start: span 12;
  }
  .kirby-column[data-width="1/2"] {
    grid-column-start: span 6;
  }
  .kirby-column[data-width="1/3"] {
    grid-column-start: span 4;
  }
  .kirby-column[data-width="2/3"] {
    grid-column-start: span 8;
  }
  .kirby-column[data-width="1/4"] {
    grid-column-start: span 3;
  }
  .kirby-column[data-width="1/6"] {
    grid-column-start: span 2;
  }
  .kirby-column[data-width="2/6"] {
    grid-column-start: span 4;
  }
  .kirby-column[data-width="3/6"] {
    grid-column-start: span 6;
  }
  .kirby-column[data-width="4/6"] {
    grid-column-start: span 8;
  }
  .kirby-column[data-width="5/6"] {
    grid-column-start: span 10;
  }
  .kirby-column[data-width="3/4"] {
    grid-column-start: span 9;
  }

}

</style>
