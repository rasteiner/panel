<template>
  <kirby-field class="kirby-radio-field" v-bind="$props">
    <kirby-radio-input v-bind="$props" v-model="data" />
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

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
