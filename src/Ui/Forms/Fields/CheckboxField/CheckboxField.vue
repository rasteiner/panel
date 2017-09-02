<template>
  <kirby-field class="kirby-checkbox-field" v-bind="$props">
    <kirby-checkbox-input v-model="data" :label="text" />
  </kirby-field>
</template>

<script>

import Props from '../Field.props.js';

export default {
  mixins: [Props],
  props: {
    label: {
      type: String
    },
    text: {
      type: String
    },
    name: {
      type: String,
      default: 'check'
    },
    value: {
      default: false
    }
  }
}

</script>

<style>

.kirby-checkbox-field .kirby-input-content {
  padding: .65rem;
}

</style>
