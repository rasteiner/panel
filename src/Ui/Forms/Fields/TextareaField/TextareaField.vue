<template>
  <kirby-field v-bind="$props">
    <kirby-textarea-input v-bind="$props" @input="$emit('input', $event)" />
  </kirby-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      default: 'Text'
    },
    name: {
      default: 'text'
    },
    icon: {
      default: 'text'
    }
  }
}

</script>
