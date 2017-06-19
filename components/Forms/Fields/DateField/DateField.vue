<template>
  <kirby-field v-bind="$props">
    <kirby-date-input v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import DateInput from '../../Inputs/DateInput/DateInput.vue';
import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-date-input': DateInput
  },
  props: {
    label: {
      default: 'Date'
    },
    name: {
      default: 'date'
    },
    icon: {
      default: 'calendar'
    }
  }
}

</script>