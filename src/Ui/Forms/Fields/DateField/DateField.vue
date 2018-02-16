<template>
  <kirby-field class="kirby-date-field" v-bind="$props">
    <kirby-date-input
      :range="range"
      :value="state"
      @input="input"
    />
  </kirby-field>
</template>

<script>

import Field from 'Ui/Forms/Field/Field.mixin.js';

export default {
  mixins: [Field],
  props: {
    name: {
      default: 'date'
    },
    label: {
      default: 'Date'
    },
    icon: {
      default: 'calendar'
    },
    range: {
      type: [Boolean, Number],
      default: 10
    }
  }
}

</script>

<style lang="scss">

.kirby-date-field .kirby-date-selects {
  background: $color-white;
}

</style>

