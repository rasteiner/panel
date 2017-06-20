<template>
  <h2 class="kirby-headline" :data-size="size"><slot /></h2>
</template>

<script>

export default {
  props: ['size']
}

</script>

<style lang="scss">

.kirby-headline {
  font-size: $font-size-medium;
  font-weight: 500;
  margin-bottom: .5rem;
  line-height: 1.5em;
}
.kirby-headline[data-size="small"] {
  font-size: $font-size-small;
}
.kirby-headline[data-size="large"] {
  font-size: $font-size-large;
}

</style>
