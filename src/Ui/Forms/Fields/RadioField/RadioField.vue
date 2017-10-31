<template>

  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input v-model="data" :name="name" :options="fieldoptions" />
  </kirby-field>

</template>

<script>

import Field from '../Field.mixin.js';
import Fieldoptions from '../Fieldoptions.mixin.js';

export default {
  mixins: [Field, Fieldoptions],
  props: {
    name: {
      type: String,
      default: 'radio'
    }
  }
}

</script>

<style>

.kirby-radio-field .kirby-input-content {
  padding: .65rem;
}

</style>
