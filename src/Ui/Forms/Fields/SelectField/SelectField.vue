<template>
  <kirby-field v-bind="$props">
    <kirby-select-input v-bind="$props" />
  </kirby-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
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
