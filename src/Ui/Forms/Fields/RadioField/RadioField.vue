<template>
  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input v-model="data" :name="name" :options="options" />
  </kirby-field>
</template>

<script>

import Field from '../Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      type: String,
      default: 'radio'
    },
    options: {
      type: Array,
      default: []
    }
  }
}

</script>

<style>

.kirby-radio-field .kirby-input-content {
  padding: .65rem;
}

</style>
