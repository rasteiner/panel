<template>
  <kirby-text-block 
    class="kirby-subheadline-block" 
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

.kirby-subheadline-block .kirby-fancy-input {
  font-size: 1.25rem;
  font-weight: 500;
}

</style>