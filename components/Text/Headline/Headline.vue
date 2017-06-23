<template>
  
  <kirby-bar v-if="$slots.options">
    <h2 slot="left" class="kirby-headline" :data-size="size"><slot /></h2>    
    <template slot="right">
      <slot name="options"></slot>
    </template>
  </kirby-bar>

  <h2 v-else class="kirby-headline" :data-size="size"><slot /></h2>

</template>

<script>

import Bar from '../../Bars/Bar/Bar.vue';

export default {
  components: {
    'kirby-bar': Bar
  },
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
