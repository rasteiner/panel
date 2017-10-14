<template>
  <kirby-field v-bind="$props">
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
    }
  }
}

</script>
