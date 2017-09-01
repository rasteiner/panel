<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <kirby-checkbox-input v-for="option in options" :key="option.text" :label="option.text" />
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
      default: 'checks'
    }
  }
}

</script>

<style>

.kirby-checkboxes-field .kirby-input-content {
  padding: .65rem .65rem;
}

</style>
