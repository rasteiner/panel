<template>
  <kirby-text-block 
    class="kirby-code-block" 
    @append="$emit('append', $event)" 
    @remove="$emit('remove')"
    @input="$emit('input', $event)" 
    :multiline="true"
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

.kirby-code-block .kirby-fancy-input {
  padding: 1.5rem;
  background: #efefef;
  font-family: $font-family-mono;
}

</style>