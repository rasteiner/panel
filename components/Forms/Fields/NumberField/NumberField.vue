<template>
  <kirby-field v-bind="$props">
    <kirby-number-input v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import NumberInput from '../../Inputs/NumberInput/NumberInput.vue';
import Props from '../TextField/TextField.props.js';

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