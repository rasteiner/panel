<template>
  <kirby-field v-bind="$props">
    <kirby-date-input v-bind="$props" @input="input" />
  </kirby-field>
</template>

<script>

import Props from '../Field.props.js';

export default {
  mixins: [Props],
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
