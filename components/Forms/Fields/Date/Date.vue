<template>
  <kirby-field v-bind="$props">
    <kirby-date v-bind="$props" />
  </kirby-field>  
</template>

<script>

import Field from '../../Field/Field.vue';
import Date from '../../Inputs/Date/Date.vue';
import Props from '../Text/Text.props.js';

export default {
  mixins: [Props],
  components: {
    'kirby-field': Field,
    'kirby-date': Date
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