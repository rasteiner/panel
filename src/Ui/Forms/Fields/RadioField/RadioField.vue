<template>

  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input v-bind="$props" v-model="value" />
  </kirby-field>

</template>

<script>

import Props from '../TextField/TextField.props.js';

export default {
  mixins: [Props],
  props: {
    options: {
      type: Array
    },
    name: {
      type: String,
      default: 'radio'
    }
  }
}

</script>

<style>

.kirby-radio-field .kirby-input-content {
  padding: .65rem .65rem;
}

</style>
