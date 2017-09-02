<template>
  <kirby-field class="kirby-checkboxes-field" v-bind="$props">
    <kirby-checkboxes-input v-model="data" v-bind="$props" />
  </kirby-field>
</template>

<script>

import Props from '../Field.props.js';

export default {
   mixins: [Props],
  props: {
    options: {
      type: Array
    },
    name: {
      type: String,
      default: 'checks'
    },
    value: {
      type: Array,
      default: []
    }
  }
}

</script>

<style>

.kirby-checkboxes-field .kirby-input-content {
  padding: .65rem .65rem;
}

</style>
