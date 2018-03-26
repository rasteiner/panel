<template>

  <kirby-bar v-if="$slots.options">
    <template slot="left">
      <h2 class="kirby-headline" :data-margin="margin" :data-size="size" :data-state="state">
        <span><slot /></span>
      </h2>
    </template>
    <template slot="right">
      <slot name="options"></slot>
    </template>
  </kirby-bar>

  <h2 v-else class="kirby-headline" :data-margin="margin" :data-size="size">
    <span><slot /></span>
  </h2>

</template>

<script>
export default {
  props: {
    size: {
      type: String
    },
    state: {
      type: String
    },
    margin: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss">
.kirby-headline {
  font-size: $font-size-medium;
  font-weight: 500;
  line-height: 1.5em;
}
.kirby-headline[data-size="small"] {
  font-size: $font-size-small;
}
.kirby-headline[data-size="large"] {
  font-size: $font-size-large;
  line-height: 1.15em;

  @media screen and (min-width: $breakpoint-medium) {
    font-size: $font-size-huge;
  }
}
.kirby-headline[data-state="negative"] {
  color: $color-negative;
}
.kirby-headline > span {
  display: block;
  padding: 1rem 0;
}

.kirby-headline[data-margin] {
  margin-bottom: 1.5rem;
}
</style>
