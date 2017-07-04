<template>
  <kirby-field v-bind="$props">
    <kirby-number-input v-bind="$props" />
  </kirby-field>
</template>

<script>

import Field from 'Forms/Field/Field.vue';
import NumberInput from 'Forms/Inputs/NumberInput/NumberInput.vue';
import Props from 'Forms/Fields/TextField/TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-number-input': NumberInput
  },
  props: {
    label: {
      default: 'Number'
    },
    name: {
      default: 'number'
    }
  }
}

</script>
