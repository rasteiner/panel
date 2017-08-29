<template>
  <div class="kirby-widget" :data-size="size">
    <div class="kirby-widget-content">
      <kirby-headline>{{ headline }}</kirby-headline>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: ['size', 'headline']
}

</script>

<style lang="scss">

.kirby-widget {
  position: relative;
  grid-column: span 1;
  grid-row: span 1;
  background: $color-white;
  padding-bottom: 66.66%;
  border-radius: $border-radius;
}
.kirby-widget[data-size="1x2"] {
  grid-column: span 1;
  grid-row: span 2;
  padding-bottom: calc(66.66% * 2);
}
.kirby-widget[data-size="2x1"] {
  grid-column: span 2;
  grid-row: span 1;
  padding-bottom: calc(66.66% / 2);
}
.kirby-widget[data-size="2x2"] {
  grid-column: span 2;
  grid-row: span 2;
  padding-bottom: calc(66.66% / 1);
}
.kirby-widget[data-size="3x1"] {
  grid-column: span 3;
  grid-row: span 1;
  padding-bottom: calc(66.66% / 3);
}
.kirby-widget[data-size="3x2"] {
  grid-column: span 3;
  grid-row: span 2;
  padding-bottom: calc(66.66% / 2);
}
.kirby-widget[data-size="3x1"] {
  grid-column: span 3;
  grid-row: span 3;
  padding-bottom: 66.66%;
}

.kirby-widget-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  padding: 1rem;
}

.kirby-widget-content .kirby-headline {
  margin-bottom: 1.5rem;
  font-family: $font-family-mono;
  font-weight: 400;
  font-size: $font-size-small;
}
.kirby-widget-content .kirby-collection {
  border-radius: $border-radius;
  overflow: hidden;
}

</style>
