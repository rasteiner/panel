<template>
  <kirby-field v-bind="$props">
    <kirby-number v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import Number from '../../Inputs/Number/Number.vue';
import Props from '../Text/Text.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-number': Number
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