<template>
  <kirby-field v-bind="$props">
    <input type="number" v-bind="$props" />
  </kirby-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  props: {
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
