<template>
  <kirby-field v-bind="$props">
    <kirby-select v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import Select from '../../Inputs/Select/Select.vue';
import Props from '../Text/Text.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-select': Select
  },
  props: {
    label: {
      default: 'Select'
    },
    name: {
      default: 'select'
    },
    icon: {
      default: 'angle-down'
    },
    options: {
    }
  }
}

</script>