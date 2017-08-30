<template>
  <kirby-field class="kirby-checkbox-field" v-bind="$props">
    <kirby-checkbox-input :label="text" />
  </kirby-field>
</template>

<script>

import Props from '../TextField/TextField.props.js';

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
    }
  }
}

</script>

<style>

.kirby-checkbox-field .kirby-input-content {
  padding: .65rem .65rem;
}

</style>
