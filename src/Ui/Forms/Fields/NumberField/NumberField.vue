<template>
  <kirby-field v-bind="$props">
    <input type="number" v-bind="$props" v-model.number="data" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    value: {
      type: Number
    },
    label: {
      default: 'Number'
    },
    name: {
      default: 'number'
    },
    min: {
      default: 0
    }
  }
}

</script>
