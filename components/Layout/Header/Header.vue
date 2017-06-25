<template>
  <header class="kirby-header">
    <kirby-headline size="large"><slot /></kirby-headline>
    <kirby-bar>
      <kirby-button-group slot="left">
        <slot name="buttons-left" />
      </kirby-button-group>
      <kirby-button-group slot="right">
        <slot name="buttons-right" />
      </kirby-button-group>
    </kirby-bar>
  </header>
</template>

<script>

import Bar from '../../Bars/Bar/Bar.vue';
import ButtonGroup from '../../Buttons/ButtonGroup/ButtonGroup.vue';
import Headline from '../../Text/Headline/Headline.vue';

export default {
  components: {
    'kirby-bar': Bar,
    'kirby-button-group': ButtonGroup,
    'kirby-headline': Headline
  }
}

</script>

<style lang="scss">

.kirby-header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 3rem;
}

</style>
