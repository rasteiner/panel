<template>
  <kirby-field v-bind="$props">

    <kirby-blocks :value="value" @input="input" />

  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  methods: {
    input (input) {
      this.$emit('input', input);
    }
  }
}

</script>
