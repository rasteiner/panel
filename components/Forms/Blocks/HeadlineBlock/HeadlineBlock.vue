<template>
  <kirby-text-block 
    class="kirby-headline-block" 
    @append="$emit('append', $event)" 
    @remove="$emit('remove')" 
    :value="value" />
</template>

<script>

import TextBlock from '../TextBlock/TextBlock.vue';

export default {
  components: {
    'kirby-text-block': TextBlock
  },
  props: ['value']
}

</script>

<style lang="scss">

.kirby-headline-block .kirby-fancy-input {
  font-size: $font-size-large;
  font-weight: 500;
  line-height: 1;
}

</style>