<template>
  <kirby-field v-bind="$props">

    <template slot="options" v-if="max">
      <kirby-counter :value="data" :max="max"></kirby-counter>
    </template>

    <kirby-text-input v-bind="$props" v-model="data" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    placeholder: {
      type: String
    },
    max: {
      type: Number
    }
  }
}

</script>
